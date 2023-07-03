<template>
  <div class="locations-list">
    <location-list-item
      v-for="location in locations"
      :key="location._id"
      :location="location"
    ></location-list-item>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      locations: [],
    };
  },
  beforeMount() {
    axios({ url: "/api/locations", method: "GET" })
      .then((resp) => {
        console.log(resp)
        this.locations = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>