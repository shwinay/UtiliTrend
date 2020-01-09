let fetch = require('node-fetch');
let fs = require('fs');

fetch('https://uinames.com/api/?amount=500&ext&region=United%20States')
.then(res => res.json())
.then(parsed => fs.writeFileSync("names.json", JSON.stringify(parsed)));