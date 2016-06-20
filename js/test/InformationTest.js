"use strict";
var Information_1 = require("../Information");
var mysql = require("mysql");
var chai = require('chai');
var TestHelper_1 = require("./TestHelper");
var assert = chai.assert;
describe('InformationTest', function () {
    var subject;
    var options = require('../../ts/test/config.json');
    var con;
    var helper;
    beforeEach(function (done) {
        con = mysql.createConnection(options.dbTest);
        con.connect(function (err) {
            if (err)
                throw new err;
            helper = new TestHelper_1.TestHelper(con);
            done();
        });
    });
    afterEach(function (done) {
        helper.dropTable('test_typed_rows_1', function () {
            done();
        });
    });
    describe('#Information', function () {
        it('should list 0 tables', function (done) {
            subject = new Information_1.Information(con);
            subject.getTables(function (err, tables) {
                assert.equal(tables.length, 0);
                done();
            });
        });
        it('should have one table', function (done) {
            subject = new Information_1.Information(con);
            helper.createTable('test_typed_rows_1', { id: 'int(10)' }, function (err, res) {
                subject.getTables(function (err, tables) {
                    assert.equal(tables.length, 1);
                    done();
                });
            });
        });
        it('describe method', function (done) {
            subject = new Information_1.Information(con);
            var table = 'test_typed_rows_1';
            helper.createTable(table, { id: 'int(10)', field2: 'varchar(255)' }, function (err, res) {
                subject.describe(table, function (err, cols) {
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
            });
        });
    });
});
