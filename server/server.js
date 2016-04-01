var debug = require('debug')('passport-mongo');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    debug('Express server listening on port 3000');
});