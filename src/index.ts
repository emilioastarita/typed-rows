#! /usr/bin/env node

import {TypedRows} from './TypedRows';
const prompted = require('prompt');
const pkg = require('../package.json');
const program = require('commander');

program
    .version(pkg.version)
    .option('-u, --user [user]', 'mysql user - Default root', 'root')
    .option('-p, --password [password]', 'mysql password')
    .option('-d, --database <database>', 'database name')
    .option('-h, --host [host]', 'database host - Default 127.0.0.1', '127.0.0.1')
    .option('-p, --port [port]', 'database port - Default 3306', '3306')
    .option('-px, --prefix [prefix]', 'interface prefix - Default I', 'I')
    .option('-o, --outfile <outfile>', 'Out file - Default ./TypedRows.ts', './TypedRows.ts')
    .parse(process.argv);


const options = {
    host: program.host,
    user: program.user,
    password: program.password,
    database: program.database,
    outfile: program.outfile,
    port : program.port,
    prefix : program.prefix
};

if (options.database === undefined) {
    console.error('No database given! use --database=dbname');
    process.exit(1);
}


if (options.outfile === undefined) {
    console.error('No output file given! use --outfile=file');
    process.exit(1);
}


const run = (options) => {
    let app = new TypedRows(options);
    app.run();
};


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





