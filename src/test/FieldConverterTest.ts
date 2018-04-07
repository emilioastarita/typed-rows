import {FieldDescription} from "../Information";
import {Generic, Datetime, Number, String, Enum} from '../FieldConverter';
import * as chai from 'chai';
const assert = chai.assert;

describe('FieldConverter', () => {
    let subject : Generic;
    let fieldDescription : FieldDescription;


    beforeEach(function () {
        fieldDescription = <FieldDescription>{
            Field: 'name',
            Type: 'varchar(255)',
            Null: 'YES',
            Key: '',
            Default: null,
            Extra: '',
        };
    });

    describe('#isOptional', () => {
        it('should mark the field no optional because NULL = NO', () => {
            fieldDescription.Null = 'NO';
            subject = Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), false);
        });
        it('should mark the field optional because NULL = YES', () => {
            fieldDescription.Null = 'YES';
            subject = Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), true);
        });
        it('should mark the field optional because AUTOINCREMENT', () => {
            fieldDescription.Null = 'NO';
            fieldDescription.Extra = 'auto_increment';
            subject = Generic.factory(fieldDescription);
            assert.equal(subject.isOptional(), true);
        });
    });

    describe('#factoryCreation', () => {
        it('should create a generic type', () => {
            fieldDescription.Type = 'no-mysql-type';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Generic);
        });
        it('should create a date type because datetime', () => {
            fieldDescription.Type = 'datetime';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Datetime);
        });
        it('should create a date type number because int(11)', () => {
            fieldDescription.Type = 'int(11)';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Number);
        });
        it('should create a date type number because decimal', () => {
            fieldDescription.Type = 'decimal(11)';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Number);
        });
        it('should create a date type number because bigint', () => {
            fieldDescription.Type = 'bigint(11)';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Number);
        });
        it('should create a date type number because unsigned', () => {
            fieldDescription.Type = 'bigint(20) unsigned';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Number);
        });
        it('should create a date type number because unsigned', () => {
            fieldDescription.Type = 'tinyint(4)';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Number);
        });
        it('should create a date type string because varchar', () => {
            fieldDescription.Type = 'varchar(4)';
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, String);
        });

        it('should create a enum data type  because enum', () => {
            fieldDescription.Type = "enum('value1','value2','value3','value4')";
            subject = Generic.factory(fieldDescription);
            assert.instanceOf(subject, Enum);
        });
    });

    describe('#Enum type test', () => {
        it('should create a fixed values type string', () => {
            fieldDescription.Type = "enum('value1','value2','value3','value4')";
            subject = Generic.factory(fieldDescription);
            assert.equal(subject.getType(), "'value1' | 'value2' | 'value3' | 'value4'");
        });
    });
});


