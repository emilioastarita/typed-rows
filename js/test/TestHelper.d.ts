import { IConnection } from "mysql";
export declare class TestHelper {
    protected conn: IConnection;
    constructor(conn: any);
    createTable(name: any, cols: any, after: any): void;
    dropTable(name: any, after: any): void;
}
