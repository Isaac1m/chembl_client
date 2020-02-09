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
    //TODO: read activities from file
  }
};
</script>


<style scoped>
</style>
