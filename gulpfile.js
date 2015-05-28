var babelify = require('babelify');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var foreach = require('gulp-foreach');
var notifier    = require('node-notifier');
var chalk       = require('chalk');
var plumber = require('gulp-plumber');
var transpile = babelify.configure({ optional: ['es7.decorators'] });
var shell = require('gulp-shell');
var cache = require('gulp-cache');
var del = require('del');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

function errLog( err ) {
    notifier.notify({ title: 'Compile Error', message : err.message });
    var log = '\n'
        + chalk.bgRed.bold('Compile Error: \n')
        + ' - '
        + chalk.yellow.bold( err.name )
        + '\n - '
        + chalk.cyan( err.message )
        + '\n';

    console.log( log );
}

function clearCache() {
    return cache.clearAll();
}

function clean(dir) {
    del(dir);
}
// clean the test directories
gulp.task('clean:test', function(cb){
    clearCache();
    del([process.cwd() + '/__tests__/'], cb);
});

gulp.task('modules', function() {
	browserify({
		  	entries: './js/app.js',
			debug: true
		})
		.transform(babelify)
		.bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest('./js'));
});
// compiles tests
gulp.task('compile-tests', ['clean:test'], function (){
    var stream = gulp.src( process.cwd() + '/js/**/*-test.js' );
    return stream
    .pipe(flatten())
    .pipe(concat('test.js'))
    .pipe(gulp.dest(process.cwd() + '/__tests__/' ));

});

gulp.task('transform-tests', ['compile-tests'], function () {
    return browserify({
		  	entries: process.cwd() +'/__tests__/test.js',
			debug: true
		})
		.transform(babelify.configure({
            optional : ["es7.decorators"],
            sourceMaps : false
        }))
		.bundle()
		.pipe(source('test.js'))
        .pipe(streamify(uglify()))
		.pipe(gulp.dest(process.cwd() + '/__tests__/'));
});

gulp.task('test', ['transform-tests'], function () {

    var stream = gulp.src(process.cwd() + '/__tests__/*.js');

    return stream
        .pipe(shell('npm test'))
        .once('finish', function (){
            console.log('Tests Ended');
        });
});
