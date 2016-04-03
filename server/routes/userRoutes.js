var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                user: {id: user._id, username: user.username},
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}),
        req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    user: {id: user._id, username: user.username},
                    status: 'Registration successful!'
                });
            });
        });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Logout successfully!'
    });
});

module.exports = router;