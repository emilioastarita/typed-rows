#! /usr/bin/env node
/// <reference path="./typings/index.d.ts" />
import {TypedRows} from './TypedRows';
const prompted = require('prompt');
const pkg = require('../package.json');
const program = require('commander');

program
    .version(pkg.version)
    .option('-u, --user [user]', 'Mysql user', 'root')
    .option('-p, --password [password]', 'Mysql password')
    .option('-d, --database <database>', 'Database name')
    .option('-h, --host [host]', 'Database host', '127.0.0.1')
    .parse(process.argv);


const options = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.database
};

if (options.database === undefined) {
    console.error('No database given! use --database=dbname');
    process.exit(1);
}


const run = (options) => {
    let app = new TypedRows(options);
    app.run();
}


if (options.password === undefined) {
    prompted.start();
    prompted.message = '';
    prompted.get([{name: 'password', hidden: true, description: 'Password'}], (err, result)=> {
        if (err) {
            process.exit(1);
        }
        options.password = result.password;
        run(options);
    });
} else {
    run(options);
}





