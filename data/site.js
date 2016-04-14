import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType as inputType
} from 'graphql';

import {country, inputCountry, state, inputState } from '../data/country';

let siteConfig = ()=> {};

siteConfig.prototype.getSite = function(db){ 

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
    
    return site;

}

siteConfig.prototype.getInputSite = function(){

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
    
    return inputSite;
}

export default new siteConfig();





