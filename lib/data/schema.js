'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _validator = require('../handlers/validator');

var _validator2 = _interopRequireDefault(_validator);

var _enums = require('./enums');

var _enums2 = _interopRequireDefault(_enums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = function Schema(db) {

    var enumProvider = (0, _enums2.default)(db);

    var countryEnum = new _graphql.GraphQLEnumType({
        name: 'countryEnum',
        values: enumProvider.countriesToEnum()
    });

    var positionEnum = new _graphql.GraphQLEnumType({
        name: "positionEnum",
        values: enumProvider.positionsToEnum()
    });

    var delegationLevelEnum = new _graphql.GraphQLEnumType({
        name: 'delegationLevelEnum',
        values: {
            HRM: { value: 6, description: "Staff" },
            HR: { value: 5, description: "Learning & Development, HR" },
            Executive: { value: 3, description: "Executives" },
            AllAccess: { value: 2, description: "All ACcess" },
            SysAdmin: { value: 1, description: "System Admin" }
        }
    });

    var agreementTypeEnum = new _graphql.GraphQLEnumType({
        name: 'agreementTypeEnum',
        values: {
            Test1: { value: 6, description: "Staff" },
            Test2: { value: 5, description: "Learning & Development, HR" },
            Test3: { value: 3, description: "Executives" }

        }
    });

    var agreementClassificationEnum = new _graphql.GraphQLEnumType({
        name: "agreementClassificationEnum",
        values: {
            AgreementClassification1: { value: 6, description: "Staff" },
            AgreementClassification2: { value: 5, description: "Learning & Development, HR" },
            AgreementClassification3: { value: 3, description: "Executives" }
        }
    });

    var assetEnum = new _graphql.GraphQLEnumType({
        name: "assetEnum",
        values: {
            M34005: { value: 1, description: "Sch of Nursing & Midwifery Head Office" },
            M37004: { value: 2, description: "East Gippsland RCS" },
            S0223: { value: 3, description: "Chemistry - Pas" }
        }
    });

    var jobTypeEnum = new _graphql.GraphQLEnumType({
        name: "jobTypeEnum",
        values: {
            JobType1: { value: 1 },
            JobType2: { value: 2 }
        }
    });

    var workPayStructureEnum = new _graphql.GraphQLEnumType({
        name: "workPayStructureEnum",
        values: {
            BaseSalary: { value: 1 },
            SalesAndIncentive: { value: 2 },
            ExecutiveNonSales: { value: 3 }
        }
    });

    var workTypeEnum = new _graphql.GraphQLEnumType({
        name: "workTypeEnum",
        values: {
            PartTime: { value: 1 },
            FullTime: { value: 2 },
            Contractor: { value: 3 },
            Casual: { value: 4 },
            FixedTerm: { value: 5 }

        }
    });

    var jobSectorEnum = new _graphql.GraphQLEnumType({
        name: "jobSectorEnum",
        values: {
            PartTime: { value: 1 },
            FullTime: { value: 2 },
            Contractor: { value: 3 },
            Casual: { value: 4 },
            FixedTerm: { value: 5 }

        }
    });

    var costCenter = new _graphql.GraphQLObjectType({
        name: "costCenter",
        fields: {
            costCenterNumber: { type: _graphql.GraphQLString },
            costCenterDescription: { type: _graphql.GraphQLString }
        }
    });

    var costCenterInput = new _graphql.GraphQLInputObjectType({
        name: "costCenterInput",
        fields: {
            costCenterNumber: { type: _graphql.GraphQLString },
            costCenterDescription: { type: _graphql.GraphQLString }
        }
    });

    var state = new _graphql.GraphQLObjectType({
        name: "state",
        country: countryEnum,
        fields: function fields() {
            return {
                // id: {type: GraphQLInt },
                name: { type: _graphql.GraphQLString }
            };
        }
    });

    var inputState = new _graphql.GraphQLInputObjectType({
        name: "inputState",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                name: { type: _graphql.GraphQLString }
            };
        }
    });

    var country = new _graphql.GraphQLObjectType({
        name: "country",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                state: { type: state },
                name: { type: _graphql.GraphQLString }
            };
        },
        resolve: function resolve(parent) {}
    });

    var inputCountry = new _graphql.GraphQLInputObjectType({
        name: "inputCountry",
        fields: function fields() {
            return {
                name: { type: _graphql.GraphQLString }
            };
        }
    });

    var site = new _graphql.GraphQLObjectType({
        name: "site",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                siteNo: { type: _graphql.GraphQLString },
                name: { type: _graphql.GraphQLString },
                address1: { type: _graphql.GraphQLString },
                address2: { type: _graphql.GraphQLString },
                suburb: { type: _graphql.GraphQLString },
                city: { type: _graphql.GraphQLString },
                country: { type: country,
                    resolve: function resolve(site, args, ast) {
                        return db.countries[site.country];
                    }
                },
                state: { type: state,
                    resolve: function resolve(site, args, ast) {
                        if (site.state != undefined) {
                            return db.states[site.state] == undefined ? null : db.states[site.state];
                        }
                        return null;
                    }
                },
                businessLayer1: { type: _graphql.GraphQLString },
                postcode: { type: _graphql.GraphQLString }
            };
        }
    });

    var inputSite = new _graphql.GraphQLInputObjectType({
        name: "inputSite",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                siteNo: { type: _graphql.GraphQLString },
                name: { type: _graphql.GraphQLString },
                address1: { type: _graphql.GraphQLString },
                address2: { type: _graphql.GraphQLString },
                suburb: { type: _graphql.GraphQLString },
                city: { type: _graphql.GraphQLString },
                country: { type: countryEnum },
                businessLayer1: { type: _graphql.GraphQLString },
                postcode: { type: _graphql.GraphQLString }
            };
        }
    });

    var updateSiteResult = new _graphql.GraphQLObjectType({
        name: "updateSiteResult",
        fields: function fields() {
            return {
                errors: { type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(_graphql.GraphQLString)) },
                site: { type: site }
            };
        }
    });

    var updateSite = {
        name: "updateSite",
        type: updateSiteResult,
        args: {
            site: { type: inputSite }
        },
        resolve: function resolve(value, _ref) {
            var site = _ref.site;

            var errors = [];
            console.log("In resolver");
            console.log(site);
            console.log(site.id);
            var error = false;
            if (!_validator2.default.validateNonEmptyId(site.id)) {
                console.log("id check failed");
                errors.push.apply(errors, ["id", "id must be supplied"]);
                error = true;
            }
            if (!_validator2.default.validateCountry(site.country)) {
                errors.push.apply(errors, ["country", "country must be supplied"]);
                error = true;
            }
            if (!error) {
                var existingSite = db.sites[site.id];

                existingSite.address1 = site.address1;
                existingSite.address2 = site.address2;
                existingSite.businessLayer1 = site.businessLayer1;
                existingSite.city = site.city;
                existingSite.country = db.findCountryByName(site.country.name);
                existingSite.state = db.findStateByName(site.state.name);
                existingSite.name = site.name;
                existingSite.siteNo = site.siteNo;
                existingSite.suburb = site.suburb;
                return { errors: errors, site: existingSite };
            }

            return { errors: errors, site: site };
        }
    };

    var businessLayer = new _graphql.GraphQLObjectType({
        name: "businessLayer",
        fields: {
            id: { type: _graphql.GraphQLInt },
            name: { type: _graphql.GraphQLString }
        }
    });

    var businessLayerInput = new _graphql.GraphQLInputObjectType({
        name: "businessLayerInput",
        fields: {
            id: { type: _graphql.GraphQLInt },
            name: { type: _graphql.GraphQLString }
        }
    });

    var agreement = new _graphql.GraphQLObjectType({
        name: "agreement",
        fields: {
            id: { type: _graphql.GraphQLInt },
            name: { type: _graphql.GraphQLString }
        }
    });

    var agreementInput = new _graphql.GraphQLInputObjectType({
        name: "agreementInput",
        fields: {
            id: { type: _graphql.GraphQLInt },
            name: { type: _graphql.GraphQLString }
        }
    });

    var orgUnit = new _graphql.GraphQLObjectType({
        name: "orgUnit",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                title: { type: _graphql.GraphQLString },
                parent: { type: orgUnit },
                layerNo: { type: _graphql.GraphQLInt },
                layer1: { type: _graphql.GraphQLString },
                layer2: { type: _graphql.GraphQLString },
                layer3: { type: _graphql.GraphQLString },
                layer4: { type: _graphql.GraphQLString }
            };
        }
    });

    var orgUnitInput = new _graphql.GraphQLInputObjectType({
        name: "orgUnitInput",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLInt },
                title: { type: _graphql.GraphQLString },
                parent: { type: orgUnitInput },
                layerNo: { type: _graphql.GraphQLInt },
                layer1: { type: _graphql.GraphQLString },
                layer2: { type: _graphql.GraphQLString },
                layer3: { type: _graphql.GraphQLString },
                layer4: { type: _graphql.GraphQLString }
            };
        }
    });

    var insertSite = {
        name: "updateSite",
        type: updateSiteResult,
        args: {
            site: { type: inputSite }
        },
        resolve: function resolve(value, _ref2) {
            var site = _ref2.site;

            var errors = [];
            console.log("In resolver");
            if (!_validator2.default.validateCountry(site.country)) errors.push.apply(errors, ["country", "country must be supplied"]);else {
                site.id = db.sites.length;
                site.country = db.findCountryByName(site.country.name);
                site.state = db.findStateByName(site.state.name);
                db.sites.push(site);
            }
            return { errors: errors, site: site };
        }
    };

    var position = new _graphql.GraphQLObjectType({
        name: "position",
        fields: function fields() {
            return {
                name: { type: _graphql.GraphQLString },
                id: { type: _graphql.GraphQLString },
                site: { type: site },
                delegationLevel: { type: delegationLevelEnum },
                brand: { type: businessLayer },
                department: { type: businessLayer },
                subDepartment: { type: businessLayer },
                departmentPosition: { type: businessLayer },
                location: { type: _graphql.GraphQLString },
                agreement: { type: _graphql.GraphQLString },
                agreementType: { type: agreementTypeEnum },
                agreementClassification: { type: agreementClassificationEnum },
                jobType: { type: jobTypeEnum },
                payScale: { type: _graphql.GraphQLInt },
                workType: { type: workTypeEnum },
                costCenter: { type: costCenter },
                orgUnit: { type: orgUnit },
                jobSector: { type: jobSectorEnum },
                asset: { type: assetEnum },
                parent: {
                    type: position,
                    resolve: function resolve(position) {
                        return db.position[position.parent];
                    }
                },
                salaryFunded: { type: _graphql.GraphQLBoolean }
            };
        }
    });

    var user = new _graphql.GraphQLObjectType({
        name: "user",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLString },
                position: {
                    type: position,
                    resolve: function resolve(user, args, ast) {
                        console.log(user.position);
                        console.log(db.positions.length);
                        return db.positions[user.position];
                    } },
                firstName: { type: _graphql.GraphQLString },
                lastName: { type: _graphql.GraphQLString }
            };
        }
    });

    var userInput = new _graphql.GraphQLInputObjectType({
        name: "userInput",
        fields: function fields() {
            return {
                id: { type: _graphql.GraphQLString },
                position: { type: positionEnum },
                firstName: { type: _graphql.GraphQLString },
                lastName: { type: _graphql.GraphQLString }
            };
        }
    });

    var inputUserResult = new _graphql.GraphQLObjectType({
        name: "inputUserResult",
        fields: function fields() {
            return {
                errors: { type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(_graphql.GraphQLString)) },
                user: { type: user }
            };
        }
    });

    var inputUserHandler = {
        name: "inputUserHandler",
        type: inputUserResult,
        args: {
            user: { type: userInput }
        },
        resolve: function resolve(value, _ref3) {
            var user = _ref3.user;

            var errors = [];

            return { errors: errors, user: user };
        }
    };

    var schema = new _graphql.GraphQLSchema({
        query: new _graphql.GraphQLObjectType({
            name: "query",
            fields: function fields() {
                return {
                    sites: {
                        type: new _graphql.GraphQLList(site),
                        resolve: function resolve(parent, args, ast) {
                            if (args.id != undefined) return [db.sites[args.id]];else if (args.country != undefined) {
                                var c = db.countries.filter(function (e) {
                                    return e.name == args.country;
                                });
                                if (c.length == 1) {
                                    return db.sites.filter(function (row) {
                                        return row.country == c[0].id;
                                    });
                                }
                                return null;
                            }
                            return db.sites;
                        },
                        args: {
                            id: {
                                name: "id",
                                type: _graphql.GraphQLInt
                            },
                            country: {
                                name: "country",
                                type: _graphql.GraphQLString
                            }
                        }
                    },
                    countries: {
                        type: new _graphql.GraphQLList(country),
                        resolve: function resolve() {
                            return db.countries;
                        }
                    },
                    states: {
                        type: new _graphql.GraphQLList(state),
                        resolve: function resolve() {
                            return db.states;
                        }
                    },
                    users: {
                        type: new _graphql.GraphQLList(user),
                        resolve: function resolve() {
                            return db.users;
                        }
                    },
                    positions: {
                        type: new _graphql.GraphQLList(position),
                        resolve: function resolve() {
                            return db.positions;
                        }
                    }
                };
            }
        }),
        mutation: new _graphql.GraphQLObjectType({
            name: "mutation",
            fields: function fields() {
                return {
                    updateSite: updateSite,
                    insertSite: insertSite,
                    insertUser: inputUserHandler
                };
            }
        })
    });

    return schema;
};

exports.default = Schema;
//# sourceMappingURL=schema.js.map