import { FieldDescription } from "./Information";
export declare class Generic {
    protected definition: FieldDescription;
    constructor(field: FieldDescription);
    isOptional(): boolean;
    output(): string;
    getType(): string;
    protected getFieldName(): string;
    static factory(field: FieldDescription): Generic | String | Number | Enum | Datetime;
}
export declare class String extends Generic {
    getType(): string;
}
export declare class Datetime extends Generic {
    getType(): string;
}
export declare class Number extends Generic {
    getType(): string;
}
export declare class Enum extends Generic {
    getType(): string;
}
