<template>
  <button @mousedown="toggleDark" @mouseup="toggleLight"
    class="w3-btn w3-border w3-round w3-card-2"
    :style="{ width: Width, height: Height, 'background-color':bgColor }"
    :aria-label="AriaLabel"
    :title="AriaLabel"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(){
    const bgColor = ref<string>("#fff");
    const toggleDark=()=>{
      bgColor.value='#CCCCCC'
    }
    const toggleLight=()=>{
      bgColor.value="#fff"
    }
    return{
      bgColor,
      toggleDark,
      toggleLight
    }
  },
  props: {
    Height: {
      type: String,
      required: true,
    },
    Width: {
      type: String,
      required: false,
    },
    AriaLabel: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped>
button {
  background-color: #fff;
  color: #6e6e6e;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 2px;
  /* z-index: 9; */
}
</style>
