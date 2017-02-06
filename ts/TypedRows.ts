import {Information} from './Information';
import {TableConversor} from './TableConverter';
import fs = require('fs');
import * as async from "async";
import mysql = require("mysql");
import {WriteStream} from "fs";
import {IConnection} from "mysql";

export interface TypedRowsOptions {
    user:string;
    password:string;
    database:string;
    host:string;
    port:string;
}

export class TypedRows {

    protected options:TypedRowsOptions;

    constructor(options:TypedRowsOptions) {
        this.options = options;
    }


    generationTime() {
        const now = new Date();
        return  now.getDate() + "-"
            + (now.getMonth()+1)  + "-"
            + now.getFullYear() + " @ "
            + now.getHours() + ":"
            + now.getMinutes() + ":"
            + now.getSeconds();
    }

    getHeaderFile() {
        let header = [];
        header.push('// Auto-generated file by Typed Rows package.')
        header.push('// Generation: ' + this.generationTime());
        header.push('');
        header.push('');
        return header.join("\n");
    }

    initResources(options, callback) {
        const connection = mysql.createConnection(options);
        connection.connect((err)=> {
            if (err) {
                return callback({code: 1, message: 'Database connect failed: ' + err.toString()});
            }
            fs.open(options.outfile, 'w', (err, fd) => {
                if (err) {
                    return callback({
                        code: 1,
                        message: 'Outfile (' + options.outfile + ')  - ' + err.toString()
                    });
                }
                return callback(null, connection, fd);
            });

        });
    }

    run() {
        this.initResources(this.options, (err : {code : number; message: string; },
                                          connection : IConnection,
                                          fd : number) => {
            if (err) {
                console.error(err.message);
                process.exit(err.code);
            }
            const info = new Information(connection);
            info.getTables((err, tables:string[]) => {
                async.map(tables, (table:string, callback) => {
                    info.describe(table, (err, fields) => {
                        const conversor = new TableConversor(table, fields);
                        callback(err, conversor.output());
                    });
                }, (err, outputs) => {
                    const header = this.getHeaderFile();
                    fs.write(fd, header + outputs.join("\n\n") + "\n");
                    connection.end();
                });
            });
        })


    }


}