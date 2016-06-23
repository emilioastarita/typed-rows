"use strict";
var Information_1 = require('./Information');
var TableConverter_1 = require('./TableConverter');
var fs = require('fs');
var async = require("async");
var mysql = require("mysql");
var TypedRows = (function () {
    function TypedRows(options) {
        this.options = options;
    }
    TypedRows.prototype.generationTime = function () {
        var now = new Date();
        return now.getDate() + "-"
            + (now.getMonth() + 1) + "-"
            + now.getFullYear() + " @ "
            + now.getHours() + ":"
            + now.getMinutes() + ":"
            + now.getSeconds();
    };
    TypedRows.prototype.getHeaderFile = function () {
        var header = [];
        header.push('// Auto-generated file by Typed Rows package.');
        header.push('// Generation: ' + this.generationTime());
        header.push('');
        header.push('');
        return header.join("\n");
    };
    TypedRows.prototype.initResources = function (options, callback) {
        var connection = mysql.createConnection(options);
        connection.connect(function (err) {
            if (err) {
                return callback({ code: 1, message: 'Database connect failed: ' + err.toString() });
            }
            fs.open(options.outfile, 'w', function (err, fd) {
                if (err) {
                    return callback({
                        code: 1,
                        message: 'Outfile (' + options.outfile + ')  - ' + err.toString()
                    });
                }
                return callback(null, connection, fd);
            });
        });
    };
    TypedRows.prototype.run = function () {
        var _this = this;
        this.initResources(this.options, function (err, connection, fd) {
            if (err) {
                console.error(err.message);
                process.exit(err.code);
            }
            var info = new Information_1.Information(connection);
            info.getTables(function (err, tables) {
                async.map(tables, function (table, callback) {
                    info.describe(table, function (err, fields) {
                        var conversor = new TableConverter_1.TableConversor(table, fields);
                        callback(err, conversor.output());
                    });
                }, function (err, outputs) {
                    var header = _this.getHeaderFile();
                    fs.write(fd, header + outputs.join("\n\n") + "\n");
                    connection.end();
                });
            });
        });
    };
    return TypedRows;
}());
exports.TypedRows = TypedRows;
