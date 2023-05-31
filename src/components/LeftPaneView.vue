<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "../store";
import LayerListView from "./LayerListView.vue";
//import SavedMapView from "./SavedMapView.vue";
// import { isMobile } from "../utils/mediaUtil";

export default defineComponent({
  components: { LayerListView/*, SavedMapView */},
  setup() {
    const store = useStore();
    const serviceAlerts = computed(()=>store.state.serviceAlerts);
    const headerRef = ref<HTMLDivElement>();
    const mapSize = computed(() => store.state.mapSize);
    const mediaSize = computed(() => store.state.mediaSize);
    const maxHeight = ref(mapSize.value.height);
    watch(mapSize, (size) => {
      const headHeight = headerRef.value ? headerRef.value.offsetHeight : 50;
      mediaSize.value=="s"?maxHeight.value = size.height - headHeight:maxHeight.value = size.height - headHeight - (size.height*.12);
    });
    // If it is on small device, close it by default.
    const isOpen = computed(() => store.state.leftPaneIsOpen);

    const toggleDisplay = () => {
      store.commit("setLeftPaneIsOpen", !store.state.leftPaneIsOpen);
      //isOpen.value = !isOpen.value;
    };
    return { isOpen, maxHeight, toggleDisplay, headerRef,store, serviceAlerts };
  }
});
</script>
<template>
  <transition name="left-pane-slide">
    <div :style="store.state.serviceAlertsBannerVisible?{top:30 + 'px'}:{top:0 + 'px'}" 
      id="map-top-left-container" 
      v-if="isOpen" class="w3-card w3-white w3-col">
      <div class="w3-container w3-border-0" ref="headerRef">
        <div class="map-left-panel-title">Map Options</div>
        <div class="map-left-panel-btn map-left-panel-close-btn w3-button" @click="toggleDisplay">
          <svg
            id="expand"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 32 32"
            class="svg-icon"
          >
            <path
              d="M31.047 28h-5l-12-12 12-12h5l-12 12 12 12zm-26-12l12-12h-5l-12 12 12 12h5l-12-12z"
              style="fill: var(--color-primaryBrand100)"
            />
          </svg>
        </div>
      </div>
      <div id="map-top-left-inner-container" class="w3-container" :style="{ maxHeight: maxHeight + 'px' }">
        <LayerListView />
        <!--<SavedMapView :IsOpen="isOpen" />-->
      </div>
    </div>
  </transition>
  <div
    v-if="!isOpen"
    id="map-top-left-container-closed"
    class="w3-container w3-padding-small w3-card w3-white w3-button"
    @click="toggleDisplay"
    :style="store.state.serviceAlertsBannerVisible?{top:35 + 'px'}:{top:0 + 'px'}"
  >
    <label class="map-left-panel-title-closed">Map Options</label>
    <div class="map-left-panel-btn map-left-panel-open-btn w3-button">
      <svg
        id="expand"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 32 32"
        class="svg-icon"
      >
        <path
          d="M1.047 4h5l12 12-12 12h-5l12-12-12-12zm26 12l-12 12h5l12-12-12-12h-5l12 12z"
          style="fill: #fff"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped>
#map-top-left-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  /* overflow-y: auto; */
  border: 1px solid var(--color-gray20);
  z-index: 10;
}

#map-top-left-container-closed {
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: visible;
  border-radius: 4px;
  border: 1px solid var(--color-primaryBrand100);
  background-color: #fff;
}
.left-pane-slide-enter-active,
.left-pane-slide-leave-active {
  transition: transform 0.2s ease;
}
.left-pane-slide-enter-from,
.left-pane-slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}
.map-left-panel-title {
  text-align: left;
  margin-right: 20px;
  font-size: var(--type-scale-base8);
  line-height: var(--type-scale-base14);
  font-weight: var(--font-weight-light);
  margin-bottom: 0;
}
.map-left-panel-title-closed {
  text-align: left;
  margin-right: 20px;
  margin-bottom: 0;
  font-size: var(--type-scale-base8);
  line-height: var(--type-scale-base10);
  font-weight: var(--font-weight-light);
}
.map-left-panel-btn {
  padding: 0 8px;
  border: 1px solid var(--color-primaryBrand100);
  background-color: #fff;
  border-radius: 6px;
  -webkit-transform: skewX(-10deg);
  -moz-transform: skewX(-10deg);
  -ms-transform: skewX(-10deg);
  transform: skewX(-10deg);
}
.map-left-panel-close-btn {
  position: absolute;
  top: 10px;
  right: 8px;
}
.map-left-panel-open-btn {
  position: relative;
  top: -5px;
  background-color: var(--color-primaryBrand100);
}
#map-top-left-inner-container {
  padding-right: 24px;
  padding-bottom: 8px;
  overflow-y: auto;
}

@media screen and (max-width: 601px) {
  #map-top-left-container {
    width: 100%;
  }
  .map-left-panel-title {
    font-size: var(--type-scale-base6);
    line-height: var(--type-scale-base12);
  }
  .map-left-panel-title-closed {
    margin-right: 10px;
    font-size: var(--type-scale-base4);
    line-height: var(--type-scale-base6);
  }
  .map-left-panel-close-btn {
    position: absolute;
    top: 5px;
  }
  .map-left-panel-open-btn {
    position: relative;
    top: -3px;
  }
}
</style>

