export interface TypedRowsOptions {
    user: string;
    password: string;
    database: string;
    host: string;
}
export declare class TypedRows {
    protected options: TypedRowsOptions;
    constructor(options: TypedRowsOptions);
    run(): void;
}
