"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _positionEnums = require("./positionEnums");

var _positionEnums2 = _interopRequireDefault(_positionEnums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positions = (0, _positionEnums2.default)();

var DataLayer = function DataLayer() {

    function Database() {

        this.countries = [{ id: 0, name: "Australia", iso: "AU" }, { id: 1, name: "New Zealand", iso: "NZ" }, { id: 2, name: "USA", iso: "USA" }, { id: 3, name: "Singapore", iso: "SN" }];

        this.states = [{ id: 0, country: 1, name: "VIC" }, { id: 1, country: 1, name: "NSW" }, { id: 2, country: 1, name: "QLD" }, { id: 3, country: 1, name: "SA" }, { id: 4, country: 1, name: "WA" }, { id: 5, country: 1, name: "TAS" }, { id: 6, country: 1, name: "ACT" }, { id: 7, country: 1, name: "NT" }, { id: 8, country: 3, name: "AK" }, { id: 9, country: 3, name: "AS" }, { id: 10, country: 3, name: "AZ" }, { id: 11, country: 3, name: "AR" }, { id: 12, country: 3, name: "CA" }, { id: 13, country: 3, name: "CO" }, { id: 14, country: 3, name: "CT" }];

        this.businessLayers = [{ id: 0, name: "businessLayer1" }, { id: 1, name: "businessLayer2" }, { id: 2, name: "businessLayer3" }, { id: 3, name: "businessLayer4" }];

        this.sites = [{ id: 0, siteNo: "xxaa", name: "Melbourne CBD", address1: "200 Collins Street", address2: "", city: "Melbourne", suburb: "Melbourne", country: 0, state: 0, postcode: 3000 }, { id: 1, siteNo: "xxaa222", name: "Sydney CBD", address1: "Level 3", address2: "200 George Street", city: "Sydney", suburb: "Sydney", country: 0, state: 1, postcode: 2000 }, { id: 2, siteNo: "xxaa333", name: "Singapore", address1: "17 Rudyard Kipling Ave", address2: "", city: "Singapore", suburb: "Singapore", country: 3, postcode: 4322342 }];

        this.positionsenums = positions.positions;

        this.positions = [{ id: 0, site: 0, name: "CEO", delegationLevel: 1, location: "CBD", agreement: "something", agreementType: 6, agreementClassification: 5, jobType: 1, payScale: 4, workType: 1, costCenter: 3, orgUnit: 3, jobSector: 1, asset: 1, salaryFunded: true }, { id: 1, site: 0, name: "COO", delegationLevel: 1, location: "CBD", agreement: "something", agreementType: 6, agreementClassification: 5, jobType: 1, payScale: 4, workType: 1, costCenter: 3, orgUnit: 3, jobSector: 1, asset: 1, parent: 0, salaryFunded: true }, { id: 2, site: 0, name: "CFO", delegationLevel: 1, location: "CBD", agreement: "something", agreementType: 6, agreementClassification: 5, jobType: 1, payScale: 4, workType: 1, costCenter: 3, orgUnit: 3, jobSector: 1, asset: 1, parent: 1, salaryFunded: true }, { id: 3, site: 0, name: "CIO", delegationLevel: 1, location: "CBD", agreement: "something", agreementType: 6, agreementClassification: 5, jobType: 1, payScale: 4, workType: 1, costCenter: 3, orgUnit: 3, jobSector: 1, asset: 1, parent: 2, salaryFunded: true }, { id: 4, site: 0, name: "Cleaner", delegationLevel: 1, location: "CBD", agreement: "something", agreementType: 6, agreementClassification: 5, jobType: 1, payScale: 4, workType: 1, costCenter: 3, orgUnit: 3, jobSector: 1, asset: 1, parent: 2, salaryFunded: true }];

        this.users = [{ id: 0, position: 0, firstName: "Barry", lastName: "McKenzie" }, { id: 1, position: 1, firstName: "Edna", lastName: "Everedge" }, { id: 2, position: 2, firstName: "Darryl", lastName: "Kerrigan" }];
    }

    Database.prototype.findCountryByName = function (name) {
        var country = this.countries.filter(function (f) {
            return f.name === name;
        });

        if (country.length > 0) return country[0];
    };

    Database.prototype.findStateByName = function (name) {
        var state = this.states.filter(function (f) {
            return f.name === name;
        });

        if (state.length > 0) return state[0];
    };

    return new Database();
};

exports.default = DataLayer;
//# sourceMappingURL=data.js.map