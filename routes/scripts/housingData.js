// C1 SES Hacakthon: Primetime Ballers
// Javascript File for Getting Housing Data from Zillow API
// ZWSID: X1-ZWz17gfuapwoi3_61q4u

// Make API Call

const fetch = require('node-fetch');
//const convert = require('xml-js');

var url =
    `http://www.zillow.com/webservice/GetDeepSearchResults.htm?` +
    `zws-id=X1-ZWz17gfuapwoi3_61q4u`; // ZWSID
    //`&address=2114+Bigelow+Ave` + // Address (replace w/ variables later)
    //`&citystatezip=Seattle%2C+WA`; // Citystatezip (replace w/ variables)
    
export function getData(address, citystatezip) {

    let taxAssessment;


    fetch(url+`&address=${address}&citystatezip=${citystatezip}`)
        .then(response => response.text())
        .then(data => {        
            taxAssessment = isolateVal('taxAssessment', data);
        })
        .catch(str => { let dataAsJSON = null; });
    
}

function isolateVal(str, data) {
    let match = data.match(`(${str})>([^>]+)(<\/${str})`);
    match = match[0].substring(match[0].indexOf('>') + 1, match[0].indexOf('</'));
    return match;
}