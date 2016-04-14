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
import siteConfig from '../data/site'
import {country, inputCountry} from '../data/country';


let Schema = (db) => {
    
    let site = siteConfig.getSite (db);
    let inputSite = siteConfig.getInputSite();

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
            if (!validator.validateCountry(site.country))
                errors.push(...["country","country must be supplied"]);
            else {
                //do update here ...
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
                updateSite: updateSite
            }),   
        })
    });
    
    return schema;
}

export default Schema;