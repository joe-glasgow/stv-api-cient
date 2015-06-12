var gulp = require('gulp');
var errLog = require('../shared/errLog');
var plumber = require('gulp-plumber');
var babelify = require('babelify');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

// transform tests
module.exports = function () {
    var allTests = gulp.src(process.cwd() + '/__tests__/*-test.js');

        allTests
            .pipe(plumber({ errorHandler : errLog}))
            .pipe(browserify({ insertGlobals : false, transform: [babelify.configure({ optional : ["es7.decorators"], sourceMaps : false })], debug: true }))
            .pipe(gulp.dest(process.cwd() + '/__tests__/'));

            return allTests;
};
