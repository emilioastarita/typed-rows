#! /usr/bin/env node
"use strict";
var TypedRows_1 = require('./TypedRows');
var prompted = require('prompt');
var pkg = require('../package.json');
var program = require('commander');
program
    .version(pkg.version)
    .option('-u, --user [user]', 'Mysql user', 'root')
    .option('-p, --password [password]', 'Mysql password')
    .option('-d, --database <database>', 'Database name')
    .option('-h, --host [host]', 'Database host', '127.0.0.1')
    .parse(process.argv);
var options = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.database
};
if (options.database === undefined) {
    console.error('No database given! use --database=dbname');
    process.exit(1);
}
var run = function (options) {
    var app = new TypedRows_1.TypedRows(options);
    app.run();
};
if (options.password === undefined) {
    prompted.start();
    prompted.message = '';
    prompted.get([{ name: 'password', hidden: true, description: 'Password' }], function (err, result) {
        if (err) {
            process.exit(1);
        }
        options.password = result.password;
        run(options);
    });
}
else {
    run(options);
}
