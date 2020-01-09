let housingData = require('./housingData');

housingData.getData("417+Sandy+Whispers+Pl", 27519)
    .then(response => console.log(response))
    