export interface TypedRowsOptions {
    user: string;
    password: string;
    database: string;
    host: string;
    port: string;
}
export declare class TypedRows {
    protected options: TypedRowsOptions;
    constructor(options: TypedRowsOptions);
    generationTime(): string;
    getHeaderFile(): string;
    initResources(options: any, callback: any): void;
    run(): void;
}
