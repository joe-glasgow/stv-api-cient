var babelify = require('babelify');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
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
var configObj = {};
var config = false;
var fs = require('fs');
var prompt = require('gulp-prompt');
var beautify = require('gulp-beautify');

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

function pushText (responseObj) {
 for (var attr in responseObj) {
     configObj[attr] = responseObj[attr];
 }
}

function writeToConfig (settings, cb) {
    fs.writeFile('config.json', JSON.stringify(settings), cb);
}

function clearCache() {
    return cache.clearAll();
}

function clean(dir) {
    del(dir);
}

// write configuration file
gulp.task('configuration', function () {
    // if we have a config file
    return fs.exists(process.cwd() + '/config.json', function (exists) {
        if (exists) {
            console.log('Already have tld settings, skipping');
            gulp.src(process.cwd() + '/config.json').pipe(shell('npm test'));
            return;
        } else {
            // write tld to config
            return gulp.src('package.json')
            .pipe(prompt.prompt({
                type : 'string',
                name : 'tld',
                message : 'Please enter your Top Level Domain i.e tv, stv2, jmor (do not include dots or slashes): '
            }, function (res) {
                // set the tld to the object
                configObj.tld = res.tld;
                // write to config file
                writeToConfig(configObj, function () {
                    // read the config file
                    return fs.readFile(process.cwd() + '/config.json', function (error, data) {
                        if (error) {
                            console.error(error);
                            return false;
                        } else {
                            // grab the tld
                            var tld = JSON.parse(data)["tld"];
                            // read the package.json
                            fs.readFile(process.cwd() + '/package.json', function (error, data) {
                                if (error) {
                                    console.error(error);
                                    return false;
                                } else {
                                    // get the package data
                                    var settings = JSON.parse(data);
                                    // set the correct tld
                                    settings["jest"]["globals"]["tld"] = tld;
                                    // write amended package.json
                                    return fs.writeFile('package.json', JSON.stringify(settings), function () {
                                        // format the package.json
                                        return gulp.src('package.json')
                                               .pipe(beautify({indentSize : 4}))
                                               .pipe(gulp.dest(process.cwd()))
                                               .pipe(shell('npm test'));
                                    });
                                }
                            });
                        }
                    });
                });
            }));
        }
    });
});
// clean the test directories
gulp.task('clean:test', function(){
    clearCache();
    del([process.cwd() + '/__tests__/']);
});
// gulp build modules
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
    .pipe(gulp.dest(process.cwd() + '/__tests__/' ));

});
// transform tests
gulp.task('transform-tests', ['compile-tests'], function () {
    var allTests = gulp.src(process.cwd() + '/__tests__/*-test.js');

        allTests
            .pipe(plumber({ errorHandler : errLog}))
            .pipe(browserify({ insertGlobals : false, transform: [babelify.configure({ optional : ["es7.decorators"], sourceMaps : false })], debug: true }))
            .pipe(gulp.dest(process.cwd() + '/__tests__/'));

            return allTests;
});

gulp.task('test', ['transform-tests'], function () {
    return gulp.run('configuration');
});
