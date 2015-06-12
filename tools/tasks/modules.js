var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
// gulp build modules
module.exports = function() {
	browserify({
		  	entries: './js/app.js',
			debug: true
		})
		.transform(babelify)
		.bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest('./js'));
}
