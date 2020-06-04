"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summoner = void 0;
var Summoner = /** @class */ (function () {
    function Summoner() {
    }
    Object.defineProperty(Summoner.prototype, "chatStatus", {
        get: function () {
            return this.availability;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Summoner.prototype, "loLStatus", {
        get: function () {
            return this.lol;
        },
        enumerable: false,
        configurable: true
    });
    return Summoner;
}());
exports.Summoner = Summoner;
