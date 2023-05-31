<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    const store = useStore();
    const serviceAlerts = computed(() => store.state.serviceAlerts.join(", "));
    watch(serviceAlerts, (alerts) => {
      if (alerts.length > 0) {
        store.commit("setServiceAlertBannerVisibility", true);
      }
      else{
        store.commit("setServiceAlertBannerVisibility", false);
      }
    });
    const bannerVisible = computed(() => store.state.serviceAlertsBannerVisible);
    const removeServiceAlertBanner = () => store.commit("setServiceAlertBannerVisibility", false);
    return { serviceAlerts, removeServiceAlertBanner, bannerVisible, store };
  },
});
</script>
<template>
  <transition name="fade">
  <div v-if="bannerVisible" id="warningBannerDiv">
    <div id="warningBannerErrorLabel">
      {{ `Layers unavailable: ${serviceAlerts}` }}
    </div>
    <button
      title="Close error banner"
      aria-label="Close error banner"
      id="error-banner-close-btn"
      class="w3-button w3-display-right"
      @click="removeServiceAlertBanner"
    >
      &times;
    </button>
  </div>
  </transition>
</template>
<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#warningBannerDiv {
  background-color: #fffaec;
  border: 1pt solid;
  position: absolute;
  text-align: left;
  vertical-align: middle;
  top: 0;
  height: 35px;
  width: 100%;
  /* overflow-y: auto; */
  border: 1px solid #ffc107;
  z-index: 10;
}

#warningBannerErrorLabel {
  top: 4px;
  right: 2em;
  bottom: 0px;
  left: 1em;
  position: absolute;
  vertical-align: middle;
  text-align: center;
  overflow: hidden;
}

#error-banner-close-btn {
  border-style: none;
  background-color: transparent;
  font-size: var(--type-scale-base6);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-normal);
  height: 35px;
}
</style>
