/// <reference path="../ts/typings/index.d.ts" />
import { IConnection } from "mysql";
export interface FieldDescription {
    Field: string;
    Type: string;
    Null: string;
    Key: string;
    Default: any;
    Extra: string;
}
export declare class Information {
    protected db: IConnection;
    constructor(db: IConnection);
    getTables(cb: (error: any, tables?: string[]) => void): void;
    describe(table: string, cb?: any): void;
}
