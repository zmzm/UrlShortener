module.exports = function (config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/components/general/*.js',
            'client/app.js',
            'client/components/**/*.js',
            'client/test/*.js'
        ],
        exclude: [],
        preprocessors: {},
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    })
};
