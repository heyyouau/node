"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var enums = function enums(db) {

    function e() {

        this.countriesToEnum = function () {
            var c = {};
            for (var i = 0; i < db.countries.length; i++) {
                var thisCountry = db.countries[i];
                c[thisCountry.iso] = { value: thisCountry.id, description: thisCountry.name };
            };
            return c;
        };

        this.positionsToEnum = function () {
            var c = {};
            for (var i = 0; i < db.positionsenums.length; i++) {
                var p = db.positionsenums[i];
                c[p.n] = { value: p.i, description: p.d };
            };
            return c;
        };
    }

    return new e();
};

exports.default = enums;
//# sourceMappingURL=enums.js.map