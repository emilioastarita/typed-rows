import {Information} from "../Information";
import * as mysql from "mysql";
import * as chai from 'chai';
import {TestHelper} from "./TestHelper";

const assert = chai.assert;

describe('InformationTest', () => {
    let subject:Information;
    const options = require('./../../config.json');
    let con;
    let helper:TestHelper;

    beforeEach((done) => {
        con = mysql.createConnection(options.dbTest);
        con.connect((err) => {
            if (err) throw err;
            helper = new TestHelper(con);
            done();
        });
    });

    afterEach((done) => {
        helper.dropTable('test_typed_rows_1', ()=> {
            done();
        })
    });

    describe('#Information', () => {
        it('should list 0 tables', (done) => {
            subject = new Information(con);
            subject.getTables((err, tables) => {
                assert.equal(tables.length, 0);
                done();
            });
        });

        it('should have one table', (done) => {
            subject = new Information(con);
            helper.createTable('test_typed_rows_1', {id: 'int(10)'}, (err, res) => {
                subject.getTables((err, tables) => {
                    assert.equal(tables.length, 1);
                    done();
                });
            })
        });

        it('describe method', (done) => {
            subject = new Information(con);
            let table = 'test_typed_rows_1';
            helper.createTable(table, {id: 'int(10)', field2: 'varchar(255)'}, (err, res) => {
                subject.describe(table, (err, cols) => {
                    assert.equal(cols.length, 2);
                    assert.equal(cols[0].hasOwnProperty('Field'), true);
                    assert.equal(cols[0].hasOwnProperty('Type'), true);
                    assert.equal(cols[0].hasOwnProperty('Null'), true);
                    assert.equal(cols[0].hasOwnProperty('Key'), true);
                    assert.equal(cols[0].hasOwnProperty('Default'), true);
                    assert.equal(cols[0].hasOwnProperty('Extra'), true);
                    assert.equal(cols[0].Type, 'int(10)');
                    assert.equal(cols[1].Type, 'varchar(255)');
                    done();
                });
            })
        });

    });


});


