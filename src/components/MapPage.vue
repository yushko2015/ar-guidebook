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
  <el-button
    v-if="isAddMarkerVisible"
    class="save-location-button"
    type="warning"
    @click="showAddLocationForm = !showAddLocationForm"
  >
    <el-icon><AddLocation style="width: 6rem; height: 6rem" /></el-icon>
  </el-button>
  <add-new-location
    :isVisible="showAddLocationForm"
    :locationData="markers[0]"
    @update:isVisible="onIsVisibleUpdate"
    @saved="onLocationSaved"
  ></add-new-location>
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
      showAddLocationForm: false,
    };
  },
  computed: {
    isAddMarkerVisible() {
      return this.markers.length > 0 && !this.showAddLocationForm;
    },
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
    onIsVisibleUpdate(value) {
        this.showAddLocationForm = value
    },
    onLocationSaved() {
        this.markers = [];
    }
  },
};
</script>
<style scoped>
.save-location-button {
  z-index: 1000;
  width: 10vw;
  height: 6vh;
  position: absolute;
  top: 2vh;
  right: 2vw;
}
.save-location-button .el-icon {
  width: 5vw;
  height: 5vh;
}
</style>
<style>
/* .leaflet-marker-pane img {
    width: 6vw!important;
    height: 7vh!important;
} */
</style>