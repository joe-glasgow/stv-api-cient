var beautify = require('gulp-beautify');
var shell = require('gulp-shell');
var prompt = require('gulp-prompt');
var fs = require('fs');
var configObj = {};
var gulp = require('gulp');

function writeToConfig (settings, cb) {
    fs.writeFile('config.json', JSON.stringify(settings), cb);
}

// write configuration file
module.exports = function () {
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
};
