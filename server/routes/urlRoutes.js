var express = require('express');
var router = express.Router();
var base58 = require('../lib/base58.js');
var ObjectId = require('mongoose').Types.ObjectId;

var Url = require('../models/url.js');

router.post('/short', function (req, res, next) {
    var longUrl = req.body.long_url;
    var about = req.body.about;
    var user = req.body.user;
    var tags = req.body.tags;
    var shortUrl = '';

    Url.findOne({long_url: longUrl}, function (err, url) {
        if (err) {
            return next(err);
        }

        if (url) {
            res.status(200).json({
                url: url,
                status: 'This url already exist!'
            });
        } else {
            var newUrl = Url({
                long_url: longUrl,
                about: about,
                user: user,
                tags: tags
            });
            newUrl.save(function (err, url) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not short url.'
                    });
                }
                res.status(200).json({
                    url: url,
                    status: 'Url shorten successfully!!'
                });
            });
        }

    });
});

router.put('/update/:urlId', function (req, res, next) {
    var id = req.params.urlId;
    var urlModel = req.body.url;
    console.log(id);

    Url.findById({_id: id}, function (err, url) {
        if (err)
            return next(err);

        if (!url) {
            return res.status(404).json({
                err: 'Url with id ' + id + ' can not be found.'
            });
        }

        url.update(urlModel, function (err, url) {
            if (err)
                return next(err);

            res.status(200).json({
                url: url,
                status: 'Url update successfully!!'
            });
        });
    });
});

router.post('/tag', function (req, res) {
    var tag = req.body.tag;
    Url.find({tags: tag}, function (err, urls) {
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        res.status(200).json({
            urls: urls,
            status: 'Matches found.'
        });
    });
});

router.post('/page/:pageNum', function (req, res) {
    var page = 1;
    var perPage = 10;
    var totalCount = 0;

    if (req.params.pageNum) {
        page = req.params.pageNum;
    }

    if (req.body.userId) {
        Url.count({user: new ObjectId(req.body.userId)}, function (err, count) {
            totalCount = count;
        });
        Url.find({user: new ObjectId(req.body.userId)}).skip((page - perPage) * perPage).limit(perPage).exec(function (err, urls) {
            if (err) {
                return res.status(500).json({
                    err: 'No records found.'
                });
            }

            res.status(200).json({
                urls: urls,
                totalCount: totalCount,
                status: 'Success for user.'
            });
        });
    }
    else {
        Url.count({}, function (err, count) {
            totalCount = count;
        });
        Url.find().skip((page - perPage) * perPage).limit(perPage).exec(function (err, urls) {
            if (err) {
                return res.status(500).json({
                    err: 'No records found.'
                });
            }
            res.status(200).json({
                urls: urls,
                totalCount: totalCount,
                status: 'Success.'
            });
        });
    }
});

router.get('/:urlId', function (req, res) {
    var id = base58.decode(req.params.urlId);
    Url.findOne({_id: id}, function (err, url) {
        if (url) {
            Url.update({_id: id}, {$inc: {click_count: 1}}, {upsert: true}, function () {
            });
            res.redirect(url.long_url);
        } else {
            res.redirect(config.webhost);
        }
    });
});

module.exports = router;