import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType as inputType,
    GraphQLEnumType
} from 'graphql';

import validator from '../handlers/validator';
import enums from './enums'

let Schema = (db) => {
    
    var enumProvider = enums(db); 
    
    let countryEnum = new GraphQLEnumType({
        name: 'countryEnum',
        values: enumProvider.countriesToEnum()
    });
    
    let positionEnum = new GraphQLEnumType({
        name: "positionEnum",
        values: enumProvider.positionsToEnum()
    });
    
    let delegationLevelEnum = new GraphQLEnumType({
        name: 'delegationLevelEnum',
        values: {
            HRM: {value: 6, description: "Staff"},
            HR: {value: 5, description: "Learning & Development, HR"},
            Executive: {value: 3, description: "Executives"},
            AllAccess: {value: 2, description: "All ACcess"},
            SysAdmin: {value: 1, description: "System Admin"}            
        }
    });
    
    let agreementTypeEnum = new GraphQLEnumType({
        name: 'agreementTypeEnum',
        values: {
            Test1: {value: 6, description: "Staff"},
            Test2: {value: 5, description: "Learning & Development, HR"},
            Test3: {value: 3, description: "Executives"}
            
        }
    });
    
    let agreementClassificationEnum = new GraphQLEnumType({
        name: "agreementClassificationEnum",
        values: {
             AgreementClassification1: {value: 6, description: "Staff"},
             AgreementClassification2: {value: 5, description: "Learning & Development, HR"},
             AgreementClassification3: {value: 3, description: "Executives"}
        }
    });
    
    
    let assetEnum = new GraphQLEnumType({
        name: "assetEnum",
        values: {
            M34005: {value: 1, description: "Sch of Nursing & Midwifery Head Office"},
            M37004: {value: 2, description: "East Gippsland RCS"},
            S0223: {value: 3, description: "Chemistry - Pas"}
        }
    });
    
    let jobTypeEnum = new GraphQLEnumType({
        name: "jobTypeEnum",
        values: {
            JobType1: {value: 1},
            JobType2: {value: 2},
        }
    });
    
    let workPayStructureEnum = new GraphQLEnumType({
        name: "workPayStructureEnum",
        values: {
            BaseSalary: {value: 1},
            SalesAndIncentive: {value: 2},
            ExecutiveNonSales: {value: 3}
        }
    });
    
     let workTypeEnum = new GraphQLEnumType({
        name: "workTypeEnum",
        values: {
            PartTime: {value: 1},
            FullTime: {value: 2},
            Contractor: {value: 3},
            Casual: {value: 4},
            FixedTerm: {value: 5},
            
        }
    });
    
    let jobSectorEnum = new GraphQLEnumType({
        name: "jobSectorEnum",
        values: {
            PartTime: {value: 1},
            FullTime: {value: 2},
            Contractor: {value: 3},
            Casual: {value: 4},
            FixedTerm: {value: 5},
            
        }
    });
    
    let costCenter = new GraphQLObjectType({
        name: "costCenter",
        fields: {
            costCenterNumber: {type: GraphQLString},
            costCenterDescription: {type: GraphQLString}
        }
    });
    
     let costCenterInput = new inputType({
        name: "costCenterInput",
        fields: {
            costCenterNumber: {type: GraphQLString},
            costCenterDescription: {type: GraphQLString}
        }
    });
    
    
    let state = new GraphQLObjectType({
        name: "state",
        country: countryEnum,
        fields: () => ({
            // id: {type: GraphQLInt },
            name: {type: GraphQLString}
        })
    });
    
    let inputState = new inputType({
        name: "inputState",
        fields: () => ({
            id: {type: GraphQLInt },
            name: { type: GraphQLString }
        })
    });
    
     
  let country = new GraphQLObjectType({
        name: "country",
        fields: () => ({
              id: {type: GraphQLInt,},
              state: {type: state},
              name: {type: GraphQLString}
        }),
        resolve: (parent) => {
            
        }
    });
    
    
    let inputCountry = new inputType({
        name: "inputCountry",
        fields: () => ({
            name: {type: GraphQLString}
        })
    });
        
    
     let site = new GraphQLObjectType({
        name: "site",
        fields: () => ({
            id: {type: GraphQLInt},
            siteNo: { type: GraphQLString},
            name: {type: GraphQLString},
            address1: {type: GraphQLString},
            address2: {type: GraphQLString},
            suburb: {type: GraphQLString},
            city: {type: GraphQLString},
            country: { type: country,
                        resolve: (site, args, ast) => {
                            return db.countries[site.country];
                        }
                    },
            state: { type: state,
                        resolve: (site, args, ast) => {
                        if (site.state != undefined){
                            return db.states[site.state] == undefined ? null : db.states[site.state];
                        }
                    return null;
                }
            },
            businessLayer1: { type: GraphQLString },
            postcode: { type: GraphQLString } 
        })
    });
    
    
      let inputSite = new inputType({
        name: "inputSite",
        fields: () => ({
            id: { type: GraphQLInt },
            siteNo: { type: GraphQLString },
            name: { type: GraphQLString },
            address1: { type: GraphQLString },
            address2: { type: GraphQLString },
            suburb: { type: GraphQLString },
            city: { type: GraphQLString },
            country: { type: countryEnum},
            businessLayer1: { type: GraphQLString },
            postcode: { type: GraphQLString } 
        })
    });
    

    let updateSiteResult = new GraphQLObjectType({
            name: "updateSiteResult",
            fields: () => ({
                errors: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
                site: {type: site}
        })
    });

    let updateSite = {
        name: "updateSite",
        type: updateSiteResult,
        args: {
            site: {type: inputSite}
        },
        resolve: (value, {site}) => {
            let errors = [];
            console.log("In resolver")
            console.log(site)
            console.log(site.id)
            var error = false;
            if (!validator.validateNonEmptyId(site.id)){
                console.log("id check failed")
                errors.push(...["id","id must be supplied"]);
                error = true;
            }
             if (!validator.validateCountry(site.country)){
                errors.push(...["country","country must be supplied"]);
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
                return  {errors,  site: existingSite};
            }
            
            return  {errors,  site};
        }  
    };              
    
    let businessLayer = new GraphQLObjectType({
        name: "businessLayer",
        fields: {
            id: {type: GraphQLInt},
            name: {type: GraphQLString}
        }
    });
    
    let businessLayerInput = new inputType({
        name: "businessLayerInput",
        fields: {
            id: {type: GraphQLInt},
            name: {type: GraphQLString}
        }
    });
    
     let agreement = new GraphQLObjectType({
        name: "agreement",
        fields: {
            id: {type: GraphQLInt},
            name: {type: GraphQLString}
        }
    });
    
     let agreementInput = new inputType({
        name: "agreementInput",
        fields: {
            id: {type: GraphQLInt},
            name: {type: GraphQLString}
        }
    });
    
    let orgUnit = new GraphQLObjectType({
        name: "orgUnit",
        fields: () => ({
            id: {type: GraphQLInt},
            title: {type: GraphQLString},
            parent: {type: orgUnit},
            layerNo: {type: GraphQLInt},
            layer1: {type: GraphQLString},
            layer2: {type: GraphQLString},
            layer3: {type: GraphQLString},
            layer4: {type: GraphQLString},
        })
    });
    
     let orgUnitInput = new inputType({
        name: "orgUnitInput",
        fields: () => ({
            id: {type: GraphQLInt},
            title: {type: GraphQLString},
            parent: {type: orgUnitInput},
            layerNo: {type: GraphQLInt},
            layer1: {type: GraphQLString},
            layer2: {type: GraphQLString},
            layer3: {type: GraphQLString},
            layer4: {type: GraphQLString},
        })
    });
    
    let insertSite = {
        name: "updateSite",
        type: updateSiteResult,
        args: {
            site: {type: inputSite}
        },
        resolve: (value, {site}) => {
            let errors = [];
            console.log("In resolver")
            if (!validator.validateCountry(site.country))
                errors.push(...["country","country must be supplied"]);
            else {
                site.id = db.sites.length;
                site.country = db.findCountryByName(site.country.name);
                site.state = db.findStateByName(site.state.name);
                db.sites.push(site);
            }
            return  {errors, site};
        }  
    };
    
    let position = new GraphQLObjectType({
        name: "position",
        fields: () => ({
                name: { type: GraphQLString },
                id: {type: GraphQLString },
                site: {type: site},
                delegationLevel: {type: delegationLevelEnum},
                brand: {type: businessLayer},
                department: {type: businessLayer},
                subDepartment: {type: businessLayer},
                departmentPosition: {type: businessLayer},
                location: {type: GraphQLString},
                agreement: {type: GraphQLString},
                agreementType: {type: agreementTypeEnum},
                agreementClassification: {type: agreementClassificationEnum},
                jobType: {type: jobTypeEnum},
                payScale: {type: GraphQLInt},
                workType: {type: workTypeEnum},
                costCenter: {type: costCenter},
                orgUnit: {type: orgUnit},
                jobSector: {type: jobSectorEnum},
                asset: {type: assetEnum},
                parent: {
                    type: position,
                    resolve: (position) => {
                        return db.position[position.parent];
                    }
                },
                salaryFunded: {type: GraphQLBoolean }
            })
        });
        
    let user = new GraphQLObjectType({
        name: "user",
        fields: () => ({
            id: {type: GraphQLString},
            position: 
            { 
                type: position,
                resolve: (user, args, ast) => {
                    console.log(user.position);
                    console.log(db.positions.length);
                    return db.positions[user.position];
            }},
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
        })
    });
            
    let userInput = new inputType({
        name: "userInput",
        fields: () => ({
            id: {type: GraphQLString},
            position: {type: positionEnum},
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString}
        })
    });       
        
    let inputUserResult = new GraphQLObjectType({
        name: "inputUserResult",
        fields: () => ({
            errors: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            user: {type: user}
        })
    });

    
    let inputUserHandler =  {
            name: "inputUserHandler",
            type: inputUserResult,
            args: {
                user: {type: userInput}
            },
            resolve: (value, {user}) => {
                let errors = [];
            
            return  {errors, user};
        }  
    }

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "query",
            fields: () => ({
                sites: {
                    type: new GraphQLList(site),
                    resolve: (parent, args, ast) => {
                        if (args.id != undefined)
                            return [ db.sites[args.id] ];
                        else if (args.country != undefined){
                            var c = db.countries.filter(function(e){ return e.name == args.country});
                            if (c.length == 1){    
                                return db.sites.filter(function(row){
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
                          type: GraphQLInt  
                        },
                        country: {
                          name: "country",
                          type: GraphQLString  
                        }
                    }
                },
                countries: {
                    type: new GraphQLList(country),
                    resolve: () => {
                        return db.countries;
                    }
                },
                states: {
                    type: new GraphQLList(state),
                    resolve: () => {
                        return db.states;
                    }
                },
                users: {
                    type: new GraphQLList(user),
                    resolve: () => {
                        return db.users;
                    }
                },
                positions: {
                    type: new GraphQLList(position),
                    resolve: () => {
                        return db.positions;
                    }
                }
            }) 
        }),
        mutation: new GraphQLObjectType({
            name: "mutation",
            fields: () => ({
                updateSite: updateSite,
                insertSite: insertSite,
                insertUser: inputUserHandler
            }),   
        })
    });
    
    return schema;
}

export default Schema;