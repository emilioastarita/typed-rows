"use strict";
var Information = (function () {
    function Information(db) {
        this.db = db;
    }
    Information.prototype.getTables = function (cb) {
        this.db.query('show tables', function (err, result, fields) {
            if (err) {
                return cb(err);
            }
            var field = fields[0].name;
            var tables = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var info = result_1[_i];
                var table = info[field];
                tables.push(table);
            }
            cb(null, tables);
        });
    };
    Information.prototype.describe = function (table, cb) {
        this.db.query('DESCRIBE ??', [table], cb);
    };
    return Information;
}());
exports.Information = Information;
