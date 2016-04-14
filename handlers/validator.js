let validator = () => {};

validator.prototype.validateCountry = function(country) {
            if (country == null || country == undefined)
                return false;
            return true;            
        }   

export default new validator();