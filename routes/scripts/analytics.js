var firebase = require("firebase/app");
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
var firebaseConfig = {
    apiKey: "AIzaSyBOiBa5tGqmsbDvCCZfcUsUzhAjEbwIv64",
    authDomain: "utilitrend.firebaseapp.com",
    databaseURL: "https://fir-demo-6315b.firebaseio.com/",
    projectId: "utilitrend",
    storageBucket: "utilitrend.appspot.com",
    messagingSenderId: "52248634509",
    appId: "1:52248634509:web:93272abeacbd64ad756ec4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let fs = require('fs');

async function analyzeUser(username) {
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

    
    let percentage = 0.00;
    while (similarUtilPrices.length < 35) {
        percentage += .01;
        for (let user in data) {
            let userdata = data[user];
            let zipcode = userdata.zipcode;
            if (myZip == zipcode) { //filter by location
                //filter by sq footage
                // let promise = new Promise(function(resolve, reject) {
                    
                // })
                // try {
                //     await similarFamily(userdata.email, username);
                // } catch (err) {
                //     console.log("error");
                // }
                // console.log(similarUtilPrices.length);
                if (similarFootage(parseInt(mySquareFootage), parseInt(userdata.footage), percentage)) {
                    // console.log(similarUtilPrices.length);
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
        break;
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

function similarFootage(footageOne, footageTwo, percentage) {
    let maxVal = footageOne + footageOne * percentage;
    let minVal = footageOne - footageOne * percentage;
    return footageTwo >= minVal && footageTwo <= maxVal;
}

function updateFamily(customer, familySize) {
    firebase.database().ref(customer).update({
        family: familySize
    });
}

async function similarFamily(customerOne, customerTwo) {
  let familyOne = 0;
  let familyTwo = 0;

  firebase.database().ref().once('value').then((snapshot) => {
    familyOne = snapshot.val()[customerOne].family;
    familyTwo = snapshot.val()[customerTwo].family;
  });

  return (familyTwo == familyOne);
}

module.exports.analyzeUser = analyzeUser;

// console.log(analyzeUser("andrea-91@example"));
analyzeUser("andrea-91@example");