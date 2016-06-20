"use strict";
var Information_1 = require('./Information');
var TableConverter_1 = require('./TableConverter');
var async = require("async");
var mysql = require("mysql");
var TypedRows = (function () {
    function TypedRows(options) {
        this.options = options;
    }
    TypedRows.prototype.run = function () {
        var connection = mysql.createConnection(this.options);
        connection.connect(function (err) {
            if (err) {
                console.log('Connection failed: ', err);
                process.exit(1);
            }
            var info = new Information_1.Information(connection);
            info.getTables(function (err, tables) {
                async.map(tables, function (table, callback) {
                    info.describe(table, function (err, fields) {
                        var conversor = new TableConverter_1.TableConversor(table, fields);
                        callback(err, conversor.output());
                    });
                }, function (err, outputs) {
                    process.stdout.write(outputs.join("\n\n") + "\n");
                    connection.end();
                });
            });
        });
    };
    return TypedRows;
}());
exports.TypedRows = TypedRows;
