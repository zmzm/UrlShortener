var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
    _id: {type: Number, index: true},
    long_url: String,
    creation_date: Date
});

module.exports = mongoose.model('url', Url);