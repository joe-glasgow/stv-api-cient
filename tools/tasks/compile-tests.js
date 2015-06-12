var gulp = require('gulp');
var flatten = require('gulp-flatten');

// compiles tests
module.exports = function () {
    var stream = gulp.src( process.cwd() + '/js/**/*-test.js' );
    return stream
    .pipe(flatten())
    .pipe(gulp.dest(process.cwd() + '/__tests__/' ));

};
