<template>
  <div v-if="appTheme=='Go Orange'" class="content-super-bottom-wrapper"></div><!--candy stripe bar for Go Orange styling-->
  <footer class="w3-container footerContainer">
    <ul>
      <li>
        Copyright WSDOT&copy;
      </li>
      <li>
        <a
          class="footerContainer"
          data-entity-substitution="canonical"
          data-entity-type="node"
          data-entity-uuid="695c71b2-1d46-4c46-8254-43c89acc6a97"
          :href="WsdotRootUrl + '/about/policies/web-privacy-notice'"
          title="Privacy Policy"
          >Privacy Policy</a
        >
      </li>
      <li>
        <a class="footerContainer" :href="WsdotRootUrl + '/about/policies/travel-information-disclaimer'">Disclaimer</a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
export default defineComponent({
   props: {
    WsdotRootUrl: {
      type: String,
      required: true,
    },
  },
  setup(){
    const store = useStore();
    const appTheme = computed(() => store.getters.getAppTheme());
    return{appTheme}
  }
});
</script>

<style>
.footerContainer{
  background-color: var(--color-footerBackground);
}
footer, footer ul li a {
  color: var(--color-themeText);
  background-color: var(--color-primaryBrand100);
}
footer ul li a:hover {
  color: var(--color-linkActive);
  text-decoration: unset;
}
footer ul {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
}
footer li {
  list-style-type: none;
  padding: 4px 1em !important;
}
@media screen and (max-width: 901px) {
  footer ul {
    flex-wrap: wrap;
    font-size: var(--type-scale-base0);
    line-height: var(--type-scale-base2);
  }

  footer li {
    padding: 2px 8px !important;
  }
}
</style>
