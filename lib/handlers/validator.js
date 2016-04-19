"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var validator = function validator() {};

validator.prototype.validateCountry = function (country) {
    if (country == null || country == undefined) return false;
    return true;
};

validator.prototype.validateNonEmptyId = function (id) {
    return !(id === undefined);
};

exports.default = new validator();
//# sourceMappingURL=validator.js.map