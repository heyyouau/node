import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType as inputType
} from 'graphql';

import validator from '../handlers/validator';

let Schema = (db) => {
    
  let country = new GraphQLObjectType({
        name: "country",
        fields: () => ({
              id: {type: GraphQLInt,},
            name: {type: GraphQLString}
        })
    });
    
    
    let inputCountry = new inputType({
        name: "inputCountry",
        fields: () => ({
            // id: {type: GraphQLInt },
            name: {type: GraphQLString}
        })
    });
    
    let state = new GraphQLObjectType({
        name: "state",
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
                        resolve: (parent, args, ast) => {
                            return db.countries[parent.country];
                        }
                    },
            state: { type: state,
                        resolve: (parent, args, ast) => {
                        if (parent.state != undefined){
                            return db.states[parent.state] == undefined ? null : db.states[parent.state];
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
            country: { type: inputCountry},
            state: { type: inputState},
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
                console.log(existingSite);
                existingSite.address1 = site.address1;
                existingSite.address2 = site.address2;
                existingSite.businessLayer1 = site.businessLayer1;
                existingSite.city = site.city;
                existingSite.country = db.findCountryByName(site.country.name);
                existingSite.state = db.findStateByName(site.state.name);
                existingSite.name = site.name;
                existingSite.siteNo = site.siteNo;
                existingSite.suburb = site.suburb;
                console.log(existingSite);
                return  {errors,  site: existingSite};
            }
            
            return  {errors,  site};
        }  
    };              
    
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
                }
            }) 
        }),
        mutation: new GraphQLObjectType({
            name: "mutation",
            fields: () => ({
                updateSite: updateSite,
                insertSite: insertSite
            }),   
        })
    });
    
    return schema;
}

export default Schema;