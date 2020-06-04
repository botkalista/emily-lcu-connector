"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = exports.getConnection = exports.setConnection = void 0;
var fetch = require("node-fetch");
var connection;
function setConnection(conn) {
    connection = conn;
}
exports.setConnection = setConnection;
function getConnection() {
    return connection;
}
exports.getConnection = getConnection;
function makeRequest(method, endpoint, data, debug) {
    if (debug === void 0) { debug = false; }
    if (!connection) {
        console.log('Connection not set');
        return;
    }
    if (debug)
        console.log(Buffer.from('riot:' + connection.token).toString('base64'));
    if (debug)
        console.log("https://127.0.0.1:" + connection.port + endpoint);
    var body;
    if (data && (method !== 'GET' && method !== 'DELETE'))
        body = typeof data === 'string' ? data : JSON.stringify(data);
    return new Promise(function (result) {
        fetch("https://127.0.0.1:" + connection.port + endpoint, {
            body: body,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from('riot:' + connection.token).toString('base64')
            }
        }).then(function (res) {
            try {
                var json = res.json();
                return json;
            }
            catch (ex) {
                if (debug)
                    console.log('Error on parsing json');
                try {
                    var text = res.text();
                    return text;
                }
                catch (ex2) {
                    if (debug)
                        console.log('Error on parsing text');
                    return;
                }
            }
        }).then(function (json) {
            if (json) {
                if (debug)
                    console.log(json);
            }
            result(json);
        });
    });
}
exports.makeRequest = makeRequest;
