"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var Generic = (function () {
    function Generic(field) {
        this.definition = field;
    }
    Generic.prototype.isOptional = function () {
        if (this.definition.Null === 'YES') {
            return true;
        }
        if (this.definition.Extra === 'auto_increment') {
            return true;
        }
        return false;
    };
    Generic.prototype.output = function () {
        var line = [];
        line.push(this.getFieldName());
        if (this.isOptional()) {
            line.push('?');
        }
        line.push(' : ');
        line.push(this.getType());
        line.push(';');
        return line.join('');
    };
    Generic.prototype.getType = function () {
        return 'any';
    };
    Generic.prototype.getFieldName = function () {
        return this.definition.Field;
    };
    Generic.factory = function (field) {
        var type = field.Type;
        if (/text/ig.exec(type) !== null) {
            return new String(field);
        }
        if (/varchar\s*\(\s*([0-9]+)\s*\)/ig.exec(type) !== null) {
            return new String(field);
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
    };
    return Generic;
}());
exports.Generic = Generic;
var String = (function (_super) {
    __extends(String, _super);
    function String() {
        _super.apply(this, arguments);
    }
    String.prototype.getType = function () {
        return 'string';
    };
    return String;
}(Generic));
exports.String = String;
var Datetime = (function (_super) {
    __extends(Datetime, _super);
    function Datetime() {
        _super.apply(this, arguments);
    }
    Datetime.prototype.getType = function () {
        return 'Date';
    };
    return Datetime;
}(Generic));
exports.Datetime = Datetime;
var Number = (function (_super) {
    __extends(Number, _super);
    function Number() {
        _super.apply(this, arguments);
    }
    Number.prototype.getType = function () {
        return 'number';
    };
    return Number;
}(Generic));
exports.Number = Number;
var Enum = (function (_super) {
    __extends(Enum, _super);
    function Enum() {
        _super.apply(this, arguments);
    }
    Enum.prototype.getType = function () {
        var _a = /enum\s*\(\s*(.+)\s*\)/ig.exec(this.definition.Type), values = _a[1];
        return values.split(',').join(' | ');
    };
    return Enum;
}(Generic));
exports.Enum = Enum;
