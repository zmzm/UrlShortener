var express = require('express');
var router = express.Router();
var base58 = require('../lib/base58.js');
var ObjectId = require('mongoose').Types.ObjectId;

var Url = require('../models/url.js');

router.post('/short', function (req, res, next) {
    var longUrl = req.body.long_url;
    var about = req.body.about;
    var user = req.body.user;
    var shortUrl = '';

    Url.findOne({long_url: longUrl}, function (err, url) {
        if (url) {
            res.status(200).json({
                url: url,
                status: 'This url already exist!'
            });
        } else {
            var newUrl = Url({
                long_url: longUrl,
                about: about,
                user: user
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

router.put('/update/:urlId', function (req, res) {


});

router.post('/page/:pageNum', function (req, res) {
    vm = this;
    var page = 1;
    var perPage = 10;
    var totalCount = 0;

    if (req.params.pageNum) {
        page = req.params.page;
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
            res.redirect(url.long_url);
        } else {
            res.redirect(config.webhost);
        }
    });
});

module.exports = router;