
let DataLayer = () => {

function Database () {

    this.countries =  [{id: 0, name: "Australia"},
                    {id: 1, name: "New Zealand"},
                    {id: 2, name: "USA"},
                    {id: 3, name: "Singapore"}];
                    
    this.states = [{id: 0, country: 1, name: "VIC"},
                    {id: 1, country:1, name: "NSW"},
                    {id: 2, country:1, name: "QLD"},
                    {id: 3,country: 1, name: "SA"},
                    {id: 4, country:1, name: "WA"},
                    {id: 5,country: 1,name:  "TAS"},
                    {id: 6,country: 1, name: "ACT"},
                    {id: 7, country:1,name:  "NT"},
                    {id: 8, country:3, name: "AK"},
                    {id: 9, country:3, name: "AS"},
                    {id: 10, country:3, name: "AZ"},
                    {id: 11, country:3,name:  "AR"},
                    {id: 12,country: 3, name: "CA"},
                    {id: 13, country:3,name:  "CO"},
                    {id: 14,country:3, name: "CT"}];
                    
    this.businessLayers = [{id: 0, name: "businessLayer1"},
                        {id: 1, name: "businessLayer2"},
                        {id: 2, name: "businessLayer3"},
                        {id: 3, name: "businessLayer4"}];
                    
    this.sites = [{id: 0, siteNo: "xxaa", name: "Melbourne CBD", address1: "200 Collins Street", address2: "", city: "Melbourne", suburb: "Melbourne", country: 0, state: 0, postcode: 3000},
                {id: 1, siteNo: "xxaa222", name: "Sydney CBD", address1: "Level 3", address2: "200 George Street", city: "Sydney",  suburb: "Sydney", country: 0, state: 1, postcode: 2000},
                {id: 2, siteNo: "xxaa333", name: "Singapore", address1: "17 Rudyard Kipling Ave", address2: "", city: "Singapore",  suburb: "Singapore", country: 3, postcode: 4322342}];
    }

    return new Database();
}

export default DataLayer;