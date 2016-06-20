import {Information} from './Information';
import {TableConversor} from './TableConverter';


import * as async from "async";
const mysql = require("mysql");

export interface TypedRowsOptions {
    user:string;
    password:string;
    database:string;
    host:string;
}

export class TypedRows {

    protected options:TypedRowsOptions;

    constructor(options:TypedRowsOptions) {
        this.options = options;
    }

    run() {
        const connection = mysql.createConnection(this.options);
        connection.connect((err)=> {
            if (err) {
                console.log('Connection failed: ', err);
                process.exit(1);
            }
            const info = new Information(connection);
            info.getTables((err, tables:string[]) => {
                async.map(tables, (table:string, callback) => {
                    info.describe(table, (err, fields) => {
                        const conversor = new TableConversor(table, fields);
                        callback(err, conversor.output());
                    });
                }, (err, outputs) => {
                    process.stdout.write(outputs.join("\n\n") + "\n");
                    connection.end();
                });
            });
        });
    }
}