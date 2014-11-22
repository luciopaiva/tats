
var
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');


/**
 * Recursively traverse rootDir collecting every file found.
 * Returns an array of file names
 *
 * @param {string} rootDir
 * @param {boolean} verbose
 * @returns {string[]}
 */
function collectFiles(rootDir, verbose) {
    var
        unvisitedFiles,
        curFile, stat,
        files;

    files = [];
    unvisitedFiles = readdirFullPath(rootDir);

    verbose && console.error(chalk.gray('Traversing "%s"...'), rootDir);

    while (unvisitedFiles.length > 0) {

        verbose && process.stderr.write(chalk.gray('+'));

        curFile = unvisitedFiles.shift();

        stat = fs.statSync(curFile);

        if (stat.isFile()) {

            files.push(curFile);

        } else if (stat.isDirectory()) {

            unvisitedFiles = readdirFullPath(curFile)
                .concat(unvisitedFiles);

        } else {

            throw new Error('File "' + curFile + '" has unknown type.');
        }
    }

    verbose && process.stderr.write('\n');

    return files;
}

function readdirFullPath(rootDir) {
    return fs.readdirSync(rootDir).map(mapToFullPath.bind(null, rootDir))
}

function mapToFullPath(filepath, filename) {

    return path.join(filepath, filename);
}

module.exports = collectFiles;
