import {FieldDescription} from "./Information";


export class Generic {
    protected definition:FieldDescription;

    constructor(field:FieldDescription) {
        this.definition = field;
    }

    isOptional() {
        if (this.definition.Null === 'YES') {
            return true;
        }
        return this.definition.Extra === 'auto_increment';

    }

    output():string {
        let line = [];
        line.push(this.getFieldName());
        if (this.isOptional()) {
            line.push('?')
        }
        line.push(' : ');
        line.push(this.getType());
        line.push(';');
        return line.join('');
    }

    getType():string {
        return 'any';
    }

    protected getFieldName():string {
        return this.definition.Field;
    }

    static factory(field:FieldDescription):Generic|String|Number|Enum|Datetime {
        let type = field.Type;
        if (/text/ig.exec(type) !== null) {
            return new String(field);
        }
        if (/varchar\s*\(\s*([0-9]+)\s*\)/ig.exec(type) !== null) {
            return new String(field);
        }
        if (/tinyint\(1\)/ig.exec(type) !== null) {
			return new Boolean(field);
		}
        if (/int|integer|smalint|tinyint|mediumint|decimal|numeric|double|bigint|float|decimal\s*\(\s*([0-9]+)\s*\)/ig.exec(type) !== null) {
            return new Number(field);
        }
        if (/enum\s*\(\s*(.+)\s*\)/ig.exec(type) !== null) {
            return new Enum(field);
        }
        if (/datetime/ig.exec(type) !== null) {
            return new Datetime(field);
        }
        return new Generic(field);
    }
}


export class String extends Generic {
    getType():string {
        return 'string';
    }
}

export class Datetime extends Generic {
    getType():string {
        return 'Date';
    }
}

export class Number extends Generic {
    getType():string {
        return 'number';
    }
}

export class Enum extends Generic {
    getType():string {
        let [, values] = /enum\s*\(\s*(.+)\s*\)/ig.exec(this.definition.Type);
        return values.split(',').join(' | ');
    }
}

export class Boolean extends Generic {
    getType():string {
        return 'boolean';
    }
}