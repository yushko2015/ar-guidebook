<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :center="[47.41322, -1.219482]"
    :use-global-leaflet="false"
    @click="addMarker"
    @ready="mapReady"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>
    <l-marker
      v-for="(marker, index) in markers"
      :lat-lng="marker"
      :key="index"
    ></l-marker>
  </l-map>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 20,
      markers: [],
    };
  },
  methods: {
    addMarker(event) {
      this.markers = [];
      this.markers.push(event.latlng);
    },
    mapReady() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((currentPosition) => {
          this.$nextTick(() => {
            this.$refs.map.leafletObject.panTo([
              currentPosition.coords.latitude,
              currentPosition.coords.longitude,
            ]);
          });
        });
      }
    },
  },
};
</script>