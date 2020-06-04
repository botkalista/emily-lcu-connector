"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.from = function (data, newObject) {
        Object.assign(newObject, data);
        return newObject;
    };
    return Model;
}());
exports.Model = Model;
