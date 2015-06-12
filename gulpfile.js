var gulp = require('gulp');

gulp.task('modules', require('./tools/tasks/modules'));
gulp.task('clean-tests', require('./tools/tasks/test-cleanup'));
gulp.task('compile-tests', ['clean-tests'], require('./tools/tasks/compile-tests'));
gulp.task('configuration', require('./tools/tasks/test-configuration'));
gulp.task('transform-tests', ['compile-tests'], require('./tools/tasks/transform-tests'));
gulp.task('test', ['transform-tests'], require('./tools/tasks/test'));
