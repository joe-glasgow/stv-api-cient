var del = require('del');
var cache = require('gulp-cache');

function clearCache() {
    return cache.clearAll();
}

// clean the test directories
module.exports = function() {
    clearCache();
    del([process.cwd() + '/__tests__/']);
};
