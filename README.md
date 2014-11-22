tats
====

Dumps a list of [stat](https://www.google.com/#q=linux+stat+command)s for all files in a folder, recursively.

## Installation

    npm install --global tats

## Usage

    tats <folder>

Should work fine in Linux and OSX. Won't work in Windows - or maybe it does if you're using cygwin 
and have ``stat`` installed, but I haven't tested it.

``tats`` will recursively traverse the root folder looking for files. For each file, it will print a
line containing:

* Last access date, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time)
* Last modified date, in Unix Time
* Last change date, in Unix Time
* Birth date, in Unix Time
* Size, in bytes
* Name

Files will be printed in alphabetical order and their paths will be relative to the root folder.

Each line can be processed by the following regular expression:

    /^(\d+)\s(\d+)\s(\d+)\s(\d+)\s(\d+)\s(.+)$/

The only exception is the first printed line, which begins with a ``#`` and serves only to describe the lines that follow.

    # <access in unix time> <modified in unix time> <change in unix time> <birth in unix time> <size in bytes> <filename>

## Example

    $ tats /Users/myuser/some_folder/
    # <access in unix time> <modified in unix time> <change in unix time> <birth in unix time> <size in bytes> <filename>
    1416698771 1416698771 1416698771 1416697485 6 .git/COMMIT_EDITMSG
    1416698807 1416697369 1416697369 1416697369 23 .git/HEAD
    1416698807 1416697726 1416697726 1416697726 304 .git/config
    1416697369 1416697369 1416697369 1416697369 73 .git/description
    1416697369 1416697369 1416697369 1416697369 452 .git/hooks/applypatch-msg.sample
    1416697369 1416697369 1416697369 1416697369 896 .git/hooks/commit-msg.sample
    1416697369 1416697369 1416697369 1416697369 189 .git/hooks/post-update.sample

