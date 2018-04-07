import {IConnection} from "mysql";

export class TestHelper {
    protected conn:IConnection = null;

    constructor(conn) {
        this.conn = conn;
    }

    createTable(name, cols, after) {
        const colDef = [];
        for (let colName of  Object.keys(cols)) {
            colDef.push(` ${colName} ${cols[colName]} `);
        }
        const query = ` CREATE TABLE ?? ( ${colDef.join(',')} ); `;
        this.conn.query(query, [name], after);
    }

    dropTable(name, after) {
        const query = ` DROP TABLE ??;`;
        this.conn.query(query, [name], after);
    }

}

