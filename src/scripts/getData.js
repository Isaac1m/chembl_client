const axios = require('axios');
const fs = require('fs');


let targets = [
    "CHEMBL325",
    "CHEMBL1937",
    "CHEMBL1829",
    "CHEMBL3524",
    "CHEMBL2563",
    "CHEMBL1865",
    "CHEMBL2716",
    "CHEMBL3192",
    "CHEMBL4145",
    "CHEMBL5103",
    "CHEMBL3310"
];

let molecules = [
    "CHEMBL98",
    "CHEMBL99",
    "CHEMBL27759",
    "CHEMBL2018302",
    "CHEMBL483254",
    "CHEMBL1213490",
    "CHEMBL356769",
    "CHEMBL272980",
    "CHEMBL430060",
    "CHEMBL1173445",
    "CHEMBL356066",
    "CHEMBL1914702"
];

let activities = [];



let writeToFile = (activities) => {
    let data = JSON.stringify(activities, null, 2);

    fs.appendFileSync('../../data/db.json', data, (err) => {
        if (err) throw err;
        // console.log(`Activity written to file`);
    });





}

let getData = () => {
    let activities = [];
    targets.map(target => {
        axios.get(
            `https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=${target}`
        )
            .then(response => {
                response.data.activities.map(activity => {
                    if (molecules.includes(activity.molecule_chembl_id) && activity.pchembl_value != null) {
                        activities.push(activity)

                    }
                })
                writeToFile(activities);
            })
            .catch(error => {
                console.error(`Error fetching activities: ${error}`);
            });


    }
    )
}


getData();


