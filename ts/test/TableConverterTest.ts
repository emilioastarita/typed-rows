
import * as chai from 'chai';
import {TableConverter} from "../TableConverter";
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
