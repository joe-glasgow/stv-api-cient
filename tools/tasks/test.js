var gulp = require('gulp');

function clean(dir) {
    del(dir);
}

module.exports = function () {
    return gulp.run('configuration');
};
