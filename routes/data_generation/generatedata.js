const fetch = require("node-fetch");
const fs = require("fs");

let data = {}
const NUM_PEOPLE = 300;
const ZIPCODE = 91011;
const MAX_BILLS = 10;

let names = JSON.parse(fs.readFileSync('names.json'));
let addresses = fs.readFileSync('addresses.txt').toString().split("\r\n");
let restaurants = fs.readFileSync('restaurants.txt').toString().split("\n");
let utilitiesList = JSON.parse(fs.readFileSync('utilitycompanies.json')).companies;
let utilities = [];
for (let i = 0; i < utilitiesList.length; i ++) {
    let u = utilitiesList[i];
    utilities.push(u.name);
}
// console.log(utilities);

for (let i = 0; i < NUM_PEOPLE; i ++) {
    let person = names[i];
    let firstName = person.name;
    let lastName = person.surname;
    let email = person.email;
    let password = firstName.toLowerCase() + lastName.toLowerCase();
    let address = addresses[i];
    let numBills = Math.floor(Math.random() * MAX_BILLS) + 1;
    let bills = [];
    for (let i = 0; i < numBills; i ++) {
        let restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        let amount = (Math.random() * 25).toFixed(2);
        let date = new Date();
        let minusDays = Math.floor(Math.random() * 30); //last month
        date.setDate(date.getDate() - minusDays);
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        newdate = year + "/" + month + "/" + day;
        bills.push({
            payee: restaurant,
            amount: amount,
            date: newdate
        });
    }    
    let minusDays = Math.floor(Math.random() * 30); //last month
    var date = new Date();
    date.setDate(date.getDate() - minusDays);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    newdate = year + "/" + month + "/" + day;
    utilAmount = (100 + Math.random() * 100).toFixed(2);
    bills.push({ //push utility bill
        payee: utilities[Math.floor(Math.random() * utilities.length)],
        amount: utilAmount,
        date: newdate
    })
    data[email] = {
        name: firstName + " " + lastName,
        email: email,
        password: password,
        address: address,
        zipcode: ZIPCODE,
        bill: bills
    }
}

fs.writeFileSync('data.json', JSON.stringify(data));