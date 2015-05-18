var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');

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
