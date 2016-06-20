import { FieldDescription } from "./Information";
export declare class TableConversor {
    protected def: FieldDescription[];
    protected name: string;
    protected indentValue: number;
    constructor(name: string, def: FieldDescription[]);
    output(): string;
    protected getInterfaceName(): string;
    protected getFieldsOutput(): string;
    protected convertField(field: FieldDescription): string;
    protected indent(str: string, level?: number): string;
}
