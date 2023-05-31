<script lang="ts">
  import { useStore } from "./store";
  import { getConfig } from "./utils/appConfigUtil";
  import SetupModal from "./components/SetupModal.vue";
  import HeaderView from "./components/HeaderView.vue";
  import FooterView from "./components/FooterView.vue";
  import { defineComponent, onBeforeUnmount, onUpdated, ref } from "vue";
  import { mapState } from "vuex";

  export default defineComponent({
    name: "App",
    components: {
      HeaderView,
      SetupModal,
      FooterView,
    },
    setup(){
      const mapHeight = ref("500px");
      const store = useStore();
      const config = getConfig();
      const activeClass = "active";
      const disabledClass = "disabled";
      const resizeMapContainer = () => {
        const headDiv = document.querySelector("#header") as HTMLElement;
        const footDiv = document.querySelector("footer") as HTMLElement;
        // The menu button has some extra height that is not reflected in the container height, so measure the menu button's height.
        const navDiv = document.querySelector(".nav-outer-wrapper") as HTMLElement;
        let navH = 0;
        if (navDiv && navDiv.offsetHeight) {
          navH = navDiv.offsetHeight;
        }
        const h = window.innerHeight - headDiv.offsetHeight - navH - footDiv.offsetHeight - 1;
        const w = window.innerWidth
        mapHeight.value = h + "px";
        store.commit("setMapSize", {
            width: w,
            height: h
        });
      };
      return {
        config,
        mapHeight,
        resizeMapContainer,
        activeClass,
        disabledClass,
      };
    },
    computed: mapState(["isInitializing"]),
  })
</script>

<template>
  <HeaderView @onLoadComplete="resizeMapContainer()" :WsdotRootUrl="config.wsdotRoot" />
  <main>
    <div
      id="map-container"
      class="w3-display-container"
      :class="[isInitializing ? disabledClass : activeClass]"
      :style="{ height: mapHeight, opacity: isInitializing ? 0.5 : 1 }"
    >
      <router-view />
      <!-- <EsriMapView /> -->
    </div>
    <SetupModal v-if="isInitializing" />
  </main>
  <FooterView :WsdotRootUrl="config.wsdotRoot" />
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
