/// <reference path="./typings/index.d.ts" />
import {IConnection} from "mysql";

export interface FieldDescription {
    Field:string;
    Type:string;
    Null:string;
    Key:string;
    Default:any;
    Extra:string;
}

export class Information {
    protected db:IConnection;


    constructor(db:IConnection) {
        this.db = db;
    }

    getTables(cb:(error:any, tables?:string[]) => void) {
        this.db.query('show tables', (err, result, fields) => {
            if (err) {
                return cb(err)
            }
            let field:string = fields[0].name;
            let tables:string[] = [];
            for (const info of result) {
                let table = info[field];
                tables.push(table);
            }
            cb(null, tables);
        });
    }

    describe(table:string, cb?) {
        this.db.query('DESCRIBE ??', [table], cb);
    }


}
