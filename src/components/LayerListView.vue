<script lang="ts">
import { useStore } from "../store";
import { computed, defineComponent } from "vue";
import { layerListIcons } from "../symbols/IconDefinitions";
import ToggleSwitchView from "./ToggleSwitchView.vue";
import { getLayerIds } from "../utils/layerUtil";

export default defineComponent({
  components: { ToggleSwitchView },
  setup() {
    const store = useStore();
    const layerIcons = layerListIcons;
    const layerList = computed(() => store.state.layerList);
    //#region toggle layer on and off
    const clickEvent = async (evt: { checked: boolean; value: string }) => {//Fired by toggle switch click event. 
      const ids = evt.value.split(",");
      console.log(ids)
      store.dispatch("updateLayerVisibility", { ids: ids, visible: evt.checked });
    };
    const getLayerVisibility = (id: string): boolean => {
      let visible = store.getters.getLayerVisibility(id);
      if (visible === undefined) { visible = false;}
      return visible;
    };
    const getLayerTitle = (id: string): string => {
      let title = store.getters.getLayerTitle(id);
      if (!title) {
        title = "";
      }
      return title;
    };

    return { layerIcons, layerList, clickEvent, getLayerVisibility, getLayerTitle, getLayerIds };
  },
});
</script>
<template>
  <div id="layer-list-widget" title="Map Features" v-if="layerList.length > 0">
    <!-- Column headers -->
    <div class="layer-list-header-row">
      <h6>Data layers</h6>
      <h6>Turn on/off</h6>
    </div>
    <!-- Traffic Flow -->
    <ToggleSwitchView
      @toggle="clickEvent"
      :Enabled="true"
      :Checked="getLayerVisibility('traffic-flow-layer')"
      :Value="getLayerIds('traffic-flow').join(',')"
      :Title="'Toggle ' + getLayerTitle('traffic-flow-layer')"
    >
      <template v-slot>
        <span class="layer-list-item-text">Traffic flow</span>
      </template>
    </ToggleSwitchView>
    <!-- Traffic Flow Legend -->
    <!-- https://www.emailonacid.com/blog/article/email-development/why-should-i-set-my-table-role-as-presentation/ -->
    <table class="trafficLegendTable" role="presentation">
      <tr class="trafficLegendRow">
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="fastLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="mediumFastLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowMediumLegendCell">&nbsp;</div>
        </td>
        <td class="trafficLegendCell">
          <div class="trafficLegendSymbolDiv" id="slowLegendCell">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td class="trafficLegendLabelCell">Clear</td>
        <td class="trafficLegendLabelCell">Moving</td>
        <td class="trafficLegendLabelCell">Slow</td>
        <td class="trafficLegendLabelCell">Stop &#38; Go</td>
      </tr>
    </table>
    <!-- Planned Construction -->
    <ToggleSwitchView
      @toggle="clickEvent"
      :Enabled="true"
      :Checked="getLayerVisibility('point-planned-construction-layer')"
      :Value="getLayerIds('planned-construction').join(',')"
      :Title="'Toggle ' + getLayerTitle('point-planned-construction-layer')"
    >
      <template v-slot>
        <span class="layer-list-item-text">Alerts</span>
      </template>
    </ToggleSwitchView>
    <!-- Planned Construction legend -->
    <div class="alerts-legend-container">
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert')?.paths"
        ></div>
        <div class="alerts-legend-label">Low</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-medium')?.paths"
        ></div>
        <div class="alerts-legend-label">Medium</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-highest')?.paths"
        ></div>
        <div class="alerts-legend-label">High</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-closed')?.paths"
        ></div>
        <div class="alerts-legend-label">Closure</div>
      </div>
    </div>
    <!-- Road Alerts 
    <ToggleSwitchView
      @toggle="clickEvent"
      :Enabled="true"
      :Checked="getLayerVisibility('road-alerts-layer')"
      :Value="getLayerIds('alert').join(',')"
      :Title="'Toggle ' + getLayerTitle('road-alerts-layer')"
    >
      <template v-slot>
        <span class="layer-list-item-text">Alerts</span>
      </template>
    </ToggleSwitchView>-->
    <!-- Road alerts legend 
    <div class="alerts-legend-container">
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert')?.paths"
        ></div>
        <div class="alerts-legend-label">Low</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-medium')?.paths"
        ></div>
        <div class="alerts-legend-label">Medium</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-alert-highest')?.paths"
        ></div>
        <div class="alerts-legend-label">High</div>
      </div>
      <div class="alerts-legend-item">
        <div
          class="alerts-legend-icon"
          v-html="layerIcons.find((x) => x.id == 'road-closed')?.paths"
        ></div>
        <div class="alerts-legend-label">Closure</div>
      </div>
    </div>-->

    <!-- Traffic Cameras 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('traffic-camera-layer')"
        Value="traffic-camera-layer"
        :Title="'Toggle ' + getLayerTitle('traffic-camera-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'traffic-camera-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Cameras</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Truck Restrictions
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('point-restrictions-layer')"
        :Value="getLayerIds('restriction').join(',')"
        :Title="'Toggle ' + getLayerTitle('point-restrictions-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'point-restrictions-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Truck restrictions (over size/weight)</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div> -->
    <!-- Mountain Passes 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('mountain-passes-layer')"
        Value="mountain-passes-layer"
        :Title="'Toggle ' + getLayerTitle('mountain-passes-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'mountain-passes-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Mountain pass reports</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Weather Stations 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('weather-stations-layer')"
        Value="weather-stations-layer"
        :Title="'Toggle ' + getLayerTitle('weather-stations-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'weather-stations-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Weather stations</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Rest Areas 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('rest-areas-layer')"
        Value="rest-areas-layer"
        :Title="'Toggle ' + getLayerTitle('rest-areas-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'rest-areas-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Rest areas</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Park And Rides 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('park-ride-layer')"
        Value="park-ride-layer"
        :Title="'Toggle ' + getLayerTitle('park-ride-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'park-ride-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Park &amp; Rides</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!--Border Crossings
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('border-crossings-layer')"
        Value="border-crossings-layer"
        :Title="'Toggle ' + getLayerTitle('border-crossings-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'border-crossing')?.paths"
            ></div>
            <span class="layer-list-item-text">Border crossing wait times</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Wildland Fires 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Enabled="true"
        :Checked="getLayerVisibility('fire-perimeters-layer')"
        :Value="getLayerIds('fire').join(',')"
        :Title="'Toggle ' + getLayerTitle('fire-perimeters-layer')"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'fire-incidents-layer')?.paths"
            ></div>
            <span class="layer-list-item-text">Wildland fires</span>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
    <!-- Mile Markers 
    <div class="layer-list-row">
      <ToggleSwitchView
        @toggle="clickEvent"
        :Checked="getLayerVisibility('mile-markers')"
        Value="mile-markers"
        :Title="'Toggle ' + getLayerTitle('mile-markers')"
        :Enabled="true"
      >
        <template v-slot>
          <div class="layer-list-item-label">
            <div
              class="layer-list-item-icon"
              v-html="layerIcons.find((x) => x.id == 'mile-markers-layer')?.paths"
            ></div>
            <div class="layer-list-item-text">Mileposts</div>
          </div>
        </template>
      </ToggleSwitchView>
    </div>-->
  </div>
</template>
<style scoped>
#layer-list-widget {
  padding-bottom: 5px;
}
.layer-list-header-row {
  display: flex;
  justify-content: space-between;
}
.layer-list-header-row h6 {
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
  font-weight: var(--font-weight-heavy);
}
.layer-list-row {
  margin: 10px 0;
}
.layer-list-item-label {
  display: flex;
  align-items: left;
}
.layer-list-item-icon {
  margin-right: 1rem;
  height: 2rem;
  width: 2rem;
}
.layer-list-item-text {
  font-size: var(--type-scale-base3);
  line-height: var(--type-scale-base7);
  font-weight: var(--font-weight-normal);
  text-align: left;
}
#slowLegendCell {
  background-color: #e6002e;
}

#slowMediumLegendCell {
  background-color: #ec8d00;
}

#mediumFastLegendCell {
  background-color: #e9d14c;
}

#fastLegendCell {
  background-color: #6dccac;
}
.trafficLegendSymbolDiv {
  height: 8px;
  margin: 0;
  border-style: none;
}
.trafficLegendTable,
.roadAlertsLegendTable {
  margin-left: 14px;
  width: 80%;
  margin-bottom: 5px;
}
.trafficLegendCell {
  width: 25%;
  padding: 0;
  border: 0px;
}
.roadAlertsLegendCell {
  width: 25%;
  border: 0px;
}
.trafficLegendRow,
.roadAlertsLegendRow {
  height: 10px;
}
.trafficLegendLabelCell,
.roadAlertsLegendLabelCell {
  background-color: white;
  border: none;
  box-shadow: none;
  font-size: var(--type-scale-base0);
  line-height: var(--type-scale-base7);
  font-weight: var(--font-weight-normal);
  vertical-align: text-top;
}
tr {
  border: none;
}
.alerts-legend-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  max-width: 80%;
  margin-left: 14px;
  margin-bottom: 14px;
}
.alerts-legend-item {
  display: flex;
  flex-direction: column;
}

.alerts-legend-label {
  font-size: var(--type-scale-base0);
  line-height: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
}
</style>
