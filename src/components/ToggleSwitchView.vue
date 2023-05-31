<template>
  <label class="Toggle" :title="Title">
    <div>
    <slot></slot>
    </div>
    <input :disabled='!Enabled'
      type="checkbox"
      name="toggle"
      class='Toggle__input'
      @change="onToggle"
      :checked="Checked"
      :value="Value"
    />
    <span class="Toggle__display" hidden> </span>
  </label>
</template>
<script lang="ts">
import { defineComponent } from "vue";
/*import {Analytics} from 'analytics';
import googleAnalytics from '@analytics/google-analytics';*/
import { getConfig } from "../utils/appConfigUtil";
import { event } from "vue-gtag";
export default defineComponent({
  props: {
    Checked: {
      type: Boolean,
      required: true,
    },
    Value: {
      type: String || Array,
      required: false,
    },
    Title: {
      type: String,
      required: true,
    },
    Enabled: {
      type: Boolean,
      required: true,
    }
  },
  setup(props, context) {
    const onToggle = (evt: Event) => {
      console.log(evt)
      const target = evt.currentTarget as HTMLInputElement;
      const sendToggleOn = ()=>{
        try{
          event('toggle_map_layer_on',{'toggle_layer': props.Title});
        }
        catch(e){
          console.error(e);
        }
      }
      const sendToggleOff = ()=>{
        try{
          event('toggle_map_layer_off',{'toggle_layer': props.Title});
        }
        catch(e){
          console.log(e);
        }
      }
      target.checked==true?sendToggleOn():sendToggleOff();
      console.log(target)
      context.emit("toggle", { checked: target.checked, value: target.value });
    };
    return { onToggle};
  },
});
</script>

<style scoped>
/*https://kittygiraudel.com/2021/04/05/an-accessible-toggle*/
/* Uncomment this rule to effectively break the stylesheet, thus simulating no-CSS styles. */
/* .selector { [property: value; } */

.Toggle {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  gap: 1ch;
}

.Toggle__input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  right: 0px;
}

.Toggle__display {
  --offset: 0.1rem;
  --diameter: 1.7rem;

  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: content-box;
  min-width: calc(var(--diameter) * 1.5 + var(--offset) * 4);
  height: calc(var(--diameter) + var(--offset) * 0);
  border: 0.1em solid var(--color-primaryBrand100);
  position: relative;
  border-radius: 100vw;
  background-color: var(--color-gray20);
  transition: 250ms;
}

.Toggle__display::before {
  content: "";
  z-index: 2;
  position: absolute;
  top: 50%;
  left: var(--offset);
  box-sizing: border-box;
  width: var(--diameter);
  height: var(--diameter);
  border: 0.1em solid var(--color-primaryBrand100);
  border-radius: 50%;
  background-color: white;
  transform: translate(0, -50%);
  will-change: transform;
  transition: inherit;
}

.Toggle:focus .Toggle__display,
.Toggle__input:focus + .Toggle__display {
  outline: 1px dotted #212121;
  outline: 1px auto -webkit-focus-ring-color;
  outline-offset: 2px;
}

.Toggle:focus,
.Toggle:focus:not(:focus-visible) .Toggle__display,
.Toggle__input:focus:not(:focus-visible) + .Toggle__display {
  outline: 0;
}

.Toggle[aria-pressed="true"] .Toggle__display,
.Toggle__input:checked + .Toggle__display {
  background-color: var(--color-primaryBrand100);
}

.Toggle[aria-pressed="true"] .Toggle__display::before,
.Toggle__input:checked + .Toggle__display::before {
  transform: translate(60%, -50%);
}

.Toggle[disabled] .Toggle__display,
.Toggle__input:disabled + .Toggle__display {
  opacity: 0.6;
  filter: grayscale(40%);
  cursor: not-allowed;
}

[dir="rtl"] .Toggle__display::before {
  left: auto;
  right: var(--offset);
}

[dir="rtl"] .Toggle[aria-pressed="true"] + .Toggle__display::before,
[dir="rtl"] .Toggle__input:checked + .Toggle__display::before {
  transform: translate(-100%, -50%);
}
</style>