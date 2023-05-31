<template>
  <div id="zoom-button-container">
    <MapButtonView Height="32px" Width="32px" @click="zoomIn" AriaLabel="Zoom in">
      <template v-slot>
        <span class="esri-icon-plus"></span>
      </template>
    </MapButtonView>
    <MapButtonView Height="32px" Width="32px" @click="zoomOut" AriaLabel="Zoom out">
      <template v-slot>
        <span class="esri-icon-minus"></span>
      </template>
    </MapButtonView>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapView } from "../esri-stuff/esriMap";
import MapButtonView from "../components/MapButtonView.vue";

export default defineComponent({
  components: { MapButtonView },
  setup() {
    const zoomIn = () => {
      mapView.zoom = mapView.zoom + 1;
    };
    const zoomOut = () => {
      mapView.zoom = mapView.zoom - 1;
    };
    return {
      zoomIn,
      zoomOut,
    };
  },
});
</script>
<style scoped>
/* #zoom-button-container {
  width: 32px;
} */
</style>
