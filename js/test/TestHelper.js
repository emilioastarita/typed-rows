"use strict";
var TestHelper = (function () {
    function TestHelper(conn) {
        this.conn = null;
        this.conn = conn;
    }
    TestHelper.prototype.createTable = function (name, cols, after) {
        var colDef = [];
        for (var _i = 0, _a = Object.keys(cols); _i < _a.length; _i++) {
            var colName = _a[_i];
            colDef.push(" " + colName + " " + cols[colName] + " ");
        }
        var query = " CREATE TABLE ?? ( " + colDef.join(',') + " ); ";
        this.conn.query(query, [name], after);
    };
    TestHelper.prototype.dropTable = function (name, after) {
        var query = " DROP TABLE ??;";
        this.conn.query(query, [name], after);
    };
    return TestHelper;
}());
exports.TestHelper = TestHelper;
