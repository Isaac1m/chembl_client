let fs = require('fs');



// Filter the data, keeping the target_chembl_id, molecule_chembl_id, and pchembl_value
const filterData = () => {

    let data = fs.readFileSync('../../data/db.json', 'utf8');
    let filteredData = [];
    JSON.parse(data).map(activity => {
        let entry = [];

        entry.push(activity.target_chembl_id);
        entry.push(activity.molecule_chembl_id);
        entry.push(activity.pchembl_value);

        filteredData.push(entry);

    })

    return filteredData;
}

// Transform the filtered data csv, ready to write to file
const transformData = (data) => {
    let csvData = data.map((row) => {
        return row.join();
    }).join('\n');

    writeToFile(csvData);
}

// Write to file
const writeToFile = (filteredData) => {

    fs.appendFile('../../data/data.csv', filteredData + '\n', (err) => {
        if (err) throw err;
        console.log(`Data written to file`);
    });

}


transformData(filterData());



