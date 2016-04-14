let validator = () => {};

validator.prototype.validateCountry = function(country) {
            if (country == null || country == undefined)
                return false;
            return true;            
        }   
        
validator.prototype.validateNonEmptyId = function(id){
    return !(id === undefined);
}        

export default new validator();