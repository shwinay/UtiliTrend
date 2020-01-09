// C1 SES Hacakthon: Primetime Ballers
// Javascript File for Getting Housing Data from Zillow API
// ZWSID: X1-ZWz17gfuapwoi3_61q4u

// Make API Call

const fetch = require('node-fetch');
//const convert = require('xml-js');

let url =
`http://www.zillow.com/webservice/GetDeepSearchResults.htm?` +
`zws-id=X1-ZWz17gfuapwoi3_61q4u`; // ZWSID
//`&address=2114+Bigelow+Ave` + // Address (replace w/ variables later)
//`&citystatezip=Seattle%2C+WA`; // Citystatezip (replace w/ variables)

function getData(address, citystatezip) {
    
    fetch(url+`&address=${address}&citystatezip=${citystatezip}`)
    .then(response => response.text())
    .then(data => {        
        const taxAssessment = isolateVal('taxAssessment', data);
        const age = (new Date).getFullYear() - isolateVal('yearBuilt', data);
        const lotSize = isolateVal('lotSizeSqFt', data);
        const residenceSize = isolateVal('finishedSqFt', data);
        const bathrooms = isolateVal('bathrooms', data);
        const bedrooms = isolateVal('bedrooms', data);
        
        let temp = data.match('(<amount currency="USD")>([^>]+)(<\/amount)');
        const zestimate = temp[0].substring(temp[0].indexOf('>') + 1, temp[0].indexOf('</'));
        
        let obj = {
            'taxAssessment' : parseInt(taxAssessment),
            'age' : parseInt(age),
            'lotSize' : parseInt(lotSize),
            'residenceSize' : parseInt(residenceSize),
            'bathrooms' : parseInt(bathrooms),
            'bedrooms' : parseInt(bedrooms),
            'zestimate' : parseInt(zestimate),
        };
        
        //console.log(obj);
        
        return obj;
    })
    .catch(str => { const dataAsJSON = null; });
    
}

function isolateVal(str, data) {
    let match = data.match(`(${str})>([^>]+)(<\/${str})`);
    match = match[0].substring(match[0].indexOf('>') + 1, match[0].indexOf('</'));
    return match;
}

module.exports.getData = getData;