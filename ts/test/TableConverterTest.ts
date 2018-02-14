/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
import {TableConverter} from "../../js/TableConverter";
import * as chai from 'chai';
let assert = chai.assert;

describe('TableConverter', () => {
    let subject : TableConverter;

    describe('#output', () => {
        it('Should use interface prefix', () => {
            subject = new TableConverter('person', [], {interfacePrefix: 'I'});
            assert.include(subject.output(), 'IPerson');
        });
    });
});
