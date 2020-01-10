let housingData = require('./housingData');
let fs = require('fs');

async function populateData() {
    let offset = 7;
    let addresses = fs.readFileSync('../data_generation/addresses.txt').toString().split("\r\n");
    let retList = [];
    for (let i = offset; i < offset + 7; i ++) {
        let address = addresses[i];
        console.log(address);
        let data = await housingData.getData(address.replace(' ', '+'), 91011);
        retList.push(data);
    }
    offset += 7;
    console.log(offset);
    return retList;
}

populateData().then(data => {
    for (let i = 0; i < data.length; i ++) {
        let size = data[i].residenceSize + "\n";
        fs.appendFileSync('squarefooting.txt', size);
    }
});