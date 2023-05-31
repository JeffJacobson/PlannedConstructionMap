<template>
  <div @click.prevent="toggle">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar"></span>
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    const store = useStore();
    const isActive = computed(() => {
      return store.state.isMobileMenuOpen;
    });
    const toggle = () => {
      store.commit("toggleIsMobileMenuOpen");
    };
    return { isActive, toggle };
  },
});
</script>

<style scoped>
/* Removed font declaration from this since the font is already declared in the main.css */
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 34px;
  width: 33px;
  display: block;
  border: 0;
  border-radius: 4px;
  text-align: center;
  background-color: var(--color-secondaryBrandLight);
  pointer-events: all;
}

.burger-bar {
  color: #000;
  font-family: "Font Awesome 5 Pro";
  font-weight: 900;
  font-size: 2rem;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  display:flex;
  justify-content:center;
}

.burger-bar::before {
  content: "\f0c9";
}
</style>
