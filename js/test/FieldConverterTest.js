"use strict";
var FieldConverter_1 = require('../FieldConverter');
var chai = require('chai');
var assert = chai.assert;
describe('FieldConverter', function () {
    var subject;
    var fieldDescription;
    beforeEach(function () {
        fieldDescription = {
            Field: 'name',
            Type: 'varchar(255)',
            Null: 'YES',
            Key: '',
            Default: null,
            Extra: '',
        };
    });
    describe('#isOptional', function () {
        it('should mark the field no optional because NULL = NO', function () {
            fieldDescription.Null = 'NO';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), false);
        });
        it('should mark the field optional because NULL = YES', function () {
            fieldDescription.Null = 'YES';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), true);
        });
        it('should mark the field optional because AUTOINCREMENT', function () {
            fieldDescription.Null = 'NO';
            fieldDescription.Extra = 'auto_increment';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), true);
        });
    });
    describe('#factoryCreation', function () {
        it('should create a generic type', function () {
            fieldDescription.Type = 'no-mysql-type';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Generic);
        });
        it('should create a date type because datetime', function () {
            fieldDescription.Type = 'datetime';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Datetime);
        });
        it('should create a date type number because int(11)', function () {
            fieldDescription.Type = 'int(11)';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Number);
        });
        it('should create a date type number because decimal', function () {
            fieldDescription.Type = 'decimal(11)';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Number);
        });
        it('should create a date type number because bigint', function () {
            fieldDescription.Type = 'bigint(11)';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Number);
        });
        it('should create a date type number because unsigned', function () {
            fieldDescription.Type = 'bigint(20) unsigned';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Number);
        });
        it('should create a date type number because unsigned', function () {
            fieldDescription.Type = 'tinyint(4)';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Number);
        });
        it('should create a date type string because varchar', function () {
            fieldDescription.Type = 'varchar(4)';
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.String);
        });
        it('should create a enum data type  because enum', function () {
            fieldDescription.Type = "enum('value1','value2','value3','value4')";
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.instanceOf(subject, FieldConverter_1.Enum);
        });
    });
    describe('#Enum type test', function () {
        it('should create a fixed values type string', function () {
            fieldDescription.Type = "enum('value1','value2','value3','value4')";
            subject = FieldConverter_1.Generic.factory(fieldDescription);
            assert.equal(subject.getType(), "'value1' | 'value2' | 'value3' | 'value4'");
        });
    });
});
