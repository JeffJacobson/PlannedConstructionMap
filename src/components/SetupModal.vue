<template>
  <div class ='w3-display-middle modalContainer'>
    <div class="w3-padding w3-display-middle modalBackground">
    </div>
    <div class="w3-padding w3-display-middle setupModal">
      <table>
        <tr>
          <td><img class="loadingSpinner" src="@/assets/loadingSpinner.gif"></td>
        </tr>
        <tr>
          <td><label class="setupLabel">{{initializingMessage}}</label></td>
        </tr>
      </table>
    </div> 
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref, watch } from "vue";
import { useStore } from "../store";
import {mapState} from "vuex"
export default defineComponent({
  //component that loads overtop the rest of the app to display the loading spinner and any initialization errors.
  setup() {
    const store = useStore();
    const containerRef = ref<HTMLDivElement>();
    const mapSize = computed(() => store.state.mapSize);
    const isOpen = ref(true);
    const displayStyle = ref("none");
    const height = ref("auto");
    onUpdated(() => {
      resizeContainer();
    });

    watch(mapSize, () => {
      resizeContainer();
    });
    const resizeContainer = () => {
      if (!containerRef.value) {
        return;
      }
      const top = containerRef.value.offsetTop;
      const h = mapSize.value.height - top * 2;
      height.value = h + "px";
    };
    return {
      containerRef,
      height,
      isOpen,
      displayStyle,
    };
  },
  computed: mapState(["initializingMessage"]),
});
</script>

<style scoped>
.setupModal{
    background-color: white;
}
.loadingSpinner{
  width: 50px;height:50px;
}
.setupLabel{
  text-align: center;
}
.modalContainer {
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  z-index: 999;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
.modalBackground{
  background-color: rgba(0, 0, 0, 0.767);
}
</style>