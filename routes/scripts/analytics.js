let fs = require('fs');
let houseDataFetch = require('./housingData');

function analyzeUser(username) {
    let data = JSON.parse(fs.readFileSync("data.json"));
    let utilitiesList = JSON.parse(fs.readFileSync('utilitycompanies.json')).companies;
    let utilities = [];
    //list of names 
    for (let i = 0; i < utilitiesList.length; i ++) {
        let u = utilitiesList[i];
        utilities.push(u.name);
    }
    
    //getting my bill
    let bill = data.username.bill;
    let myUtilityCost = 0;
    for (let item in bill) {
        if (utilities.includes(item.payee)) myUtilityCost = item.amount;
    }

    let myZip = data.username.zipcode;
    houseDataFetch.getData(data.username.address.replace(' ', '+'), parseInt(myZip))
        .then(response => {
            let mySqFt = response.residenceSize;
            let minFilter = 1;
            let maxFilter = 1;
            while (filteredUsers.length < 30) {
                minFilter -= .1
                maxFilter += .1
                for (let user in data) {
                    //filter by zipcode
                    if (user.zipcode == myZip) {
                        //get square footage
                        let userAddr = user.address.replace(' ', '+');
                        let userSqFt = houseDataFetch(userAddr, myZip).residenceSize;
                        //tolerance 10%, increasing by 10% if 30 users are not found
                        if (userSqFt > (minFilter * mySqFt) && userSqFt < (maxFilter * mySqFt) && !filteredUsers.includes(user)) {
                            filteredUsers.push(user);
                        }
        
                    }
                }
            }
        })
    
    let filteredUsers = [];
}