"use strict";
var _ = require("lodash");
var FieldConverter_1 = require('./FieldConverter');
var TableConversor = (function () {
    function TableConversor(name, def) {
        this.indentValue = 4;
        this.name = name;
        this.def = def;
    }
    TableConversor.prototype.output = function () {
        var out = [];
        out.push('export interface ' + this.getInterfaceName() + ' { ');
        out.push(this.getFieldsOutput());
        out.push('}');
        return out.join("\n");
    };
    TableConversor.prototype.getInterfaceName = function () {
        var camel = _.camelCase(this.name);
        return 'I' + camel.charAt(0).toUpperCase() + camel.slice(1);
    };
    TableConversor.prototype.getFieldsOutput = function () {
        var out = [];
        for (var _i = 0, _a = this.def; _i < _a.length; _i++) {
            var field = _a[_i];
            var line = this.indent(this.convertField(field), 1);
            out.push(line);
        }
        return out.join("\n");
    };
    TableConversor.prototype.convertField = function (field) {
        var conversor = FieldConverter_1.Generic.factory(field);
        return conversor.output();
    };
    TableConversor.prototype.indent = function (str, level) {
        if (level === void 0) { level = 1; }
        return _.repeat(' ', level * this.indentValue) + str;
    };
    return TableConversor;
}());
exports.TableConversor = TableConversor;
