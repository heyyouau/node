import {
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';
import validator from '../handlers/validator';
import {
    site,
    inputSite
    }
 from '../data/site'


let createSite = {
    type: new ObjectType({
        name: 'createSiteResult',
        fields: {
            errors: {type: new NonNull(new List(StringType))},
            site: site 
        }
    }),
    args: {
        site: {type: inputSite}
    },
    resolve: (value, {site}) => {
        console.log(site);
        console.log("in site mutation");
        var result = new EditSiteResult;
        if (!validator.validateCountry(site.country))
            result.errors.push(...["country","country must be supplied"]);
        
        return  result;
    }          
}

export default createSite;
