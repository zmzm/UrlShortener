var express = require('express');
var router = express.Router();
var base58 = require('../lib/base58.js');

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

router.get('/user/:userId', function (req, res) {

});

router.get('/:urlId', function (req, res) {
    res.status(200).json({
        res: req.params.urlId
    });
});

module.exports = router;