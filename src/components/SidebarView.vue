<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="close" v-if="isOpen">
      <div class="sidebar-close-icon">&times;</div>
    </div>
    <transition name="slide">
      <div v-if="isOpen" class="sidebar-panel">
        <!-- Links from id="sidr-existing-content". Removed the classes. -->
        <div>
          <a :href="WsdotRootUrl + '/travel'" data-drupal-link-system-path="node/403">Travel</a>
        </div>
        <div>
          <a :href="WsdotRootUrl + '/construction-planning'" data-drupal-link-system-path="node/404">Construction &amp;
            planning</a>
        </div>
        <div>
          <a :href="WsdotRootUrl + '/business-wsdot'" data-drupal-link-system-path="node/405">Business with WSDOT</a>
        </div>
        <div>
          <a :href="WsdotRootUrl + '/engineering-standards'" data-drupal-link-system-path="node/406">Engineering &amp;
            standards</a>
        </div>
        <div>
          <a :href="WsdotRootUrl + '/about'" data-drupal-link-system-path="node/53">About</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  props: {
    WsdotRootUrl: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const isOpen = computed(() => {
      return store.state.isMobileMenuOpen;
    });
    const close = () => {
      store.commit("toggleIsMobileMenuOpen");
    };
    return { isOpen, close };
  },
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.sidebar {
  font-size: 15px;
}

.right {
  transition: right 0.2s ease 0s;
  right: 0px;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 998;
}

.sidebar-close-icon {
  position: absolute;
  top: 10px;
  right: 85vw;
  color: #fff;
  font-size: var(--type-scale-base9);
  line-height: 30px;
  font-weight: var(--font-weight-normal);
  text-align: center;
  /* Circle */
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #000;
}

.sidebar-panel {
  overflow-y: auto;
  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 0;
  width: 80vw;
  text-align: left;
}

.sidebar-panel {
  border-bottom: none;
  list-style-type: none;
  padding-left: 0;
}

.sidebar-panel div {
  border-top: none;
  border-bottom: 2px solid #f4f4f5;
  padding: 14px 15px;
  line-height: 1.3em;
  position: relative;
}

.sidebar-panel div a {
  color: #1d252d;
  font-weight: 600;
  line-height: 1.8rem;
  padding: 3px 10px 5px 10px;
  border-bottom: none;
}

.sidebar-panel div a:visited {
  color: #1d252d;
}
.sidebar-panel div:focus,
.sidebar-panel div:hover {
  text-decoration: underline;
}

.sidebar-panel div.active a {
  box-shadow: none !important;
}

/* .sidebar-panel ul li ul li {
  border: none;
  list-style-type: none;
  padding: 5px 0;
}

.sidebar-panel ul li ul li a {
  border: none;
} */
@media screen and (min-width: 401px) {
  .sidebar-panel {
    width: 300px;
  }

  .sidebar-close-icon {
    right: 320px;
  }
}
</style>
