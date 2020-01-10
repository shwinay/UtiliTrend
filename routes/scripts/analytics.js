let fs = require('fs');

function analyzeUser(username) {
    let data = JSON.parse(fs.readFileSync("../data.json"));
    let utilitiesList = JSON.parse(fs.readFileSync('../data_generation/utilitycompanies.json')).companies;
    let utilities = [];
    //list of names 
    for (let i = 0; i < utilitiesList.length; i ++) {
        let u = utilitiesList[i];
        utilities.push(u.name);
    }

    //getting my bill
    let myBill = data[username].bill;
    let myUtilityCost = 0;
    for (let i = 0; i < myBill.length; i ++) {
        let item = myBill[i];
        if (utilities.includes(item.payee)) {myUtilityCost = item.amount;}
    }

    let mySquareFootage = data[username].footage;
    let similarUtilPrices = [];
    let myZip = data[username].zipcode;

    for (let user in data) {
        let userdata = data[user];
        let zipcode = userdata.zipcode;
        if (myZip == zipcode) { //filter by location
            //filter by sq footage
            if (similarFootage(parseInt(mySquareFootage), parseInt(userdata.footage))) {
                similarUtilPrices.push(userdata);
            }
        }
    }
    
    return similarUtilPrices;
}

function similarFootage(footageOne, footageTwo) {
    let percentage = 0.05;
    let maxVal = footageOne + footageOne * percentage;
    let minVal = footageOne - footageOne * percentage;
    return footageTwo >= minVal && footageTwo <= maxVal;
}

console.log(analyzeUser("andrea-91@example").length);