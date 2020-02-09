<template>
  <div>
    <h3>Fetch Data Here...</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      targets: [],
      activities: []
    };
  },

  created() {
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
  }
};
</script>


<style scoped>
</style>
