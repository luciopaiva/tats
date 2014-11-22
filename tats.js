#! /usr/bin/env node

var
    spawn = require('child_process').spawn,
    minimist = require('minimist'),
    async = require('async'),
    traverse = require('./lib/traverse');


function usage() {

    console.info('Usage: node tats <folder>');
}

function stat(filename, callback) {
    var
        result = '',
        command, params, options,
        child;

    command = 'stat';
    params = ['-f', '%a %m %c %B %z %N', filename];
    options = {
        stdio: ['ignore', 'pipe', 'ignore']
    };

    child = spawn(command, params, options);

    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function (data) {
        result += data;
    });

    child.on('close', function (code) {

        if (code !== 0) {

            callback('Spawn exited with code "' + code + '" for "' + filename + '".');

        } else {

            callback(null, result.trim());
        }
    });
}

function main(args) {
    var
        files,
        stats = {};

    if (args._.length < 1) {

        usage();

    } else {

        process.chdir(args._[0]);

        files = traverse('.');

        // keep the number of max simultaneous open files equal to 10, otherwise EMFILE error will happen
        async.eachLimit(files, 10, iterateFile, complete);
    }

    function complete(err) {
        var
            names;

        if (err) {

            throw new Error(err);

        } else {

            names = Object.keys(stats).sort();

            console.info('# <access in unix time> <modified in unix time> <change in unix time> <birth in unix time> <size in bytes> <filename>');

            names.forEach(function (filename) {

                console.info(stats[filename]);
            });
        }
    }

    function iterateFile(filename, callback) {

        stat(filename, function registarStat(err, stat) {

            if (err) {

                callback(err);

            } else {

                stats[filename] = stat;
                callback();
            }
        });
    }

}

function processArgs() {

    return minimist(process.argv.slice(2));
}

main(processArgs());
