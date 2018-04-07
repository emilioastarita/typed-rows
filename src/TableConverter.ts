import {FieldDescription} from "./Information";

import * as _ from "lodash";

import {Generic} from './FieldConverter';


export interface TableConverterOptions {
  interfacePrefix:string;
}

export class TableConverter {

    protected def:FieldDescription[];
    protected options:TableConverterOptions;
    protected name:string;
    protected indentValue = 4;

    constructor(name:string, def:FieldDescription[], options: TableConverterOptions) {
        this.name = name;
        this.def = def;
        this.options = options;
    }

    output() {
        let out = [];
        out.push('export interface ' + this.getInterfaceName() + ' { ');
        out.push(this.getFieldsOutput());
        out.push('}');
        return out.join("\n");
    }

    protected getInterfaceName():string {
        let camel = _.camelCase(this.name);
        return this.options.interfacePrefix + camel.charAt(0).toUpperCase() + camel.slice(1);
    }

    protected getFieldsOutput():string {
        let out:string[] = [];
        for (const field of this.def) {
            let line = this.indent(this.convertField(field), 1);
            out.push(line);
        }
        return out.join("\n");
    }

    protected convertField(field:FieldDescription) {
        let conversor = Generic.factory(field);
        return conversor.output();
    }

    protected indent(str:string, level = 1) {
        return _.repeat(' ', level * this.indentValue) + str;
    }

}
