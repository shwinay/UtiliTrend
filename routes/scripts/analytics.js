let fs = require('fs');
function analyzeUser(username) {
    console.log(__dirname);
    let data = JSON.parse(fs.readFileSync(__dirname + "/../data.json"));
    let utilitiesList = JSON.parse(fs.readFileSync(__dirname + '/../data_generation/utilitycompanies.json')).companies;
    let utilities = [];
    //list of names     
    for (let i = 0; i < utilitiesList.length; i ++) {
        let u = utilitiesList[i];
        utilities.push(u.name);
    }
    //getting my bill
    if (!data.hasOwnProperty(username)) return {"Error": "User not found.."};
    let myBill = data[username].bill;
    let myUtilityCost = 0;
    for (let i = 0; i < myBill.length; i ++) {
        let item = myBill[i];
        if (utilities.includes(item.payee)) myUtilityCost = item.amount;
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
                let userBill = userdata.bill;
                for (let i = 0; i < userBill.length; i ++) {
                    let item = userBill[i];
                    if (utilities.includes(item.payee)) {
                        similarUtilPrices.push(item.amount);
                        break;
                    }
                }
            }
        }
    }
    
    //calculate avg of similar costs
    let sum = 0;
    for (let i = 0; i < similarUtilPrices.length; i ++) {
        sum += parseInt(similarUtilPrices[i]);
    }
    let average = (sum / similarUtilPrices.length).toFixed(2);
    return {
        "User_Cost": myUtilityCost,
        "Similar_Costs": similarUtilPrices,
        "Average_Similar_Cost": average
    };
}
function getBill(username) {
    let data = JSON.parse(fs.readFileSync(__dirname + "/../data.json"));
    if (!data.hasOwnProperty(username)) return {"Error": "User not found.."};
    console.log(data[username]);
    return data[username].bill;
}
function similarFootage(footageOne, footageTwo) {
    let percentage = 0.05;
    let maxVal = footageOne + footageOne * percentage;
    let minVal = footageOne - footageOne * percentage;
    return footageTwo >= minVal && footageTwo <= maxVal;
}
module.exports.analyzeUser = analyzeUser;
module.exports.getBill = getBill;