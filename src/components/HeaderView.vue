<template>
  <!-- Get the code from https://dev.azure.com/WSDOT/External%20HTML%20Template/_git/ExternalHtmlTemplate?path=/default.htm 
    1. Copy the header from the template, then make the following changes.
      - Update WSDOT logo image path to src="@/assets/wsdot-logo-white.svg"
      - Add @load="onImgLoad()" to the WSDOT logo
          <img src="@/assets/wsdot-logo-white.svg" alt="Home" @load="onImgLoad()" />
      - Update the link to the home page https://wsdot.wa.gov/
        Two places to update:
          <a class="logo navbar-btn pull-left" href="--link--" title="Home" rel="home">
          <a class="name navbar-brand" href="--link--" title="Home" rel="home">
    2. Copy the navigation bar section.
    3. Replace the burger menu with the BurgerView component. Import the BurgerView component and change the line below in the template.
        The original:
          <a id="main-menu" href="#menu-schmenu" class="sidr-trigger"><span class="sidr-trigger__icon"><i class="fa fa-bars"></i></span></a>
        After the change:
          <a id="burger-menu" href="#menu-schmenu"><BurgerView /></a>
    4. Add the SidebarView component.
    5. Copy the list with the links from id="sidr-existing-content" in the WATECH template. Then remove all the classes.
-->
  <header id="header">
    <div class="header-wrapper">
      <div class="logo-container">
        <div class="region region-header">
          <a class="logo navbar-btn pull-left" :href="WsdotRootUrl" title="Home" rel="home">
            <img v-if="appTheme!='Go Orange'" src="@/assets/wsdot-logo-white.svg" alt="Home" @load="onImgLoad()"/>
            <img v-if="appTheme=='Go Orange'" src="@/assets/wsdot-logo-black.svg" alt="Home" @load="onImgLoad()"/>
          </a>
          <a class="name navbar-brand" :href="WsdotRootUrl" title="Home" rel="home">WSDOT</a>

          <!-- <a id="main-menu" href="#menu-schmenu" class="sidr-trigger"
            ><span class="sidr-trigger__icon"><i class="fa fa-bars"></i></span
          ></a> -->
          <a id="burger-menu" href="#menu-schmenu"><BurgerView /></a>
        </div>
      </div>
    </div>
  </header>
  <div class="nav-outer-wrapper">
    <div class="navbar navbar-default container" id="navbar" role="nav">
      <div class="nav-tabs break-lg-control" aria-hidden="false">
        <nav aria-describedby="block-mainnavigation-8-menu">
          <h2 class="sr-only menu-heading" id="block-mainnavigation-8-menu">Main navigation</h2>
          <div class="container-fluid" id="menu-schmenu">
            <ul class="menu menu--main nav">
              <li class="first">
                <a :href="WsdotRootUrl + '/travel'" data-drupal-link-system-path="node/403"
                  >Travel</a
                >
              </li>
              <li>
                <a
                  :href="WsdotRootUrl + '/construction-planning'"
                  data-drupal-link-system-path="node/404"
                  >Construction &amp; planning</a
                >
              </li>
              <li>
                <a :href="WsdotRootUrl + '/business-wsdot'" data-drupal-link-system-path="node/405"
                  >Business with WSDOT</a
                >
              </li>
              <li>
                <a
                  :href="WsdotRootUrl + '/engineering-standards'"
                  data-drupal-link-system-path="node/406"
                  >Engineering &amp; standards</a
                >
              </li>
              <li class="last">
                <a :href="WsdotRootUrl + '/about'" data-drupal-link-system-path="node/53">About</a>
              </li>
              <li v-if="appTheme=='Go Orange'" class="workzoneSafetyLink">
                <a
                  :href="WsdotRootUrl + '/about/events-programs/give-em-brake'" 
                  data-drupal-link-system-path="node/87"
                  >We're orange for safety</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- Mobile menu opened by the burger button -->
  <SidebarView :WsdotRootUrl="WsdotRootUrl" />
</template>

<script lang="ts">
import { useStore } from "../store";
import { defineComponent, computed } from "vue";
import BurgerView from "./BurgerView.vue";
import SidebarView from "./SidebarView.vue";

export default defineComponent({
  props: {
    WsdotRootUrl: {
      type: String,
      required: true,
    },
  },
  components: { BurgerView, SidebarView },
  // https://v3.vuejs.org/guide/component-custom-events.html#defining-custom-events
  emits: ["onLoadComplete"],
  setup(props, context) {
    const store = useStore();
    const appTheme = computed(() => (store.getters.getAppTheme()));
    // DOT icon is loaded slightly later, so let the app know when that is complete.
    const onImgLoad = () => {
      context.emit("onLoadComplete");
    };
    return { onImgLoad, appTheme };
  },
});
</script>

<style>
#burger-menu {
  display: none;
}
.logo.navbar-btn.pull-left {
  text-align: left;
}
#header {
    background-color: var(--color-primaryBrand100);
}
@media screen and (max-width: 991px) {
  #burger-menu {
    display: block;
  }
  #burger-menu {
    position: absolute;
    right: 0;
    top: 10px;
    height: 34px;
    width: 33px;
    font-size: 2rem;
  }
}
@media screen and (max-width: 1263px) {
  html body header .logo-container .region-header .logo {
    padding-left: 2%;
  }
  html body header {
    padding-right: 2%;
  }
}
</style>

