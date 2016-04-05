var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var base58 = require('../lib/base58.js');
var config = require('../config.js');

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

var Url = new Schema({
    _id: {type: Number, index: true},
    long_url: String,
    short_url: String,
    about: String,
    creation_date: Date,
    click_count: Number,
    tags: Array,
    user: {
        type: Schema.ObjectId,
        refs: 'users'
    }
});

Url.pre('save', function(next){
    var url = this;
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
        if (error)
            return next(error);
        url.created_at = new Date();
        url._id = counter.seq;
        url.short_url = config.webhost + base58.encode(url._id);
        url.click_count = 0;
        next();
    });
});

module.exports = mongoose.model('url', Url);