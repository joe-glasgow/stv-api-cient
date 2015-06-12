var notifier    = require('node-notifier');
var chalk       = require('chalk');

module.exports = function errLog( err ) {
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
