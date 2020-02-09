const axios = require('axios');
const fs = require('fs');

function writeToFile(activities) {

    let data = JSON.stringify(activities, null, 2);

    fs.writeFile('../../data/db.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('This is after the write call');
}

function getData() {
    //test endpoint
    axios
        .get(
            `https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=CHEMBL325`
        )
        .then(response => {
            const { activities } = response.data;
            writeToFile(activities);
            // console.log(activities);
        })
        .catch(error => {
            console.error(`Error fetching activities: ${error}`);
        });
}


getData();


