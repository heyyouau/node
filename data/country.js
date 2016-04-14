import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType as inputType
} from 'graphql';

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



