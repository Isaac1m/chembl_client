const axios = require('axios');


let activities = [];

//test endpoint
axios
.get(
  `{https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=CHEMBL325}`
)
.then(response => {
  const { activities } = response;
  this.activities.push(activities);
})
.catch(error => {
  console.error(`Error fetching activities: ${error}`);
});