<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";
import Graphic from "@arcgis/core/Graphic";
import Layer from "@arcgis/core/layers/Layer";
import Point from "@arcgis/core/geometry/Point";
import Extent from "@arcgis/core/geometry/Extent";
import LayerView from "@arcgis/core/views/layers/LayerView";
import * as WatchUtils from "@arcgis/core/core/watchUtils.js";
import Collection from "@arcgis/core/core/Collection";
import { getConfig } from "../utils/appConfigUtil";
import { mapView, refreshLayerData, webmap, /*zoomToMetroArea*/ } from "../esri-stuff/esriMap";
/*import {
  paramValidationInterface,
  getFeatureTypeFromLayerId,
} from "../utils/urlParamUtil";*/
import { getFeature, getLayerGroupInfos, getLayerIds, getUniqueIdName } from "../utils/layerUtil";
/*import {
  removeGraphicsByType,
  hidePointInteractionGraphics,
  displayPointInteractionGraphics,
} from "../utils/graphicLayerUtil";
import ZoomExtentLayer, { getFeatureById as getZoomFeatureById } from "../layers/ZoomExtentLayer";
import { clusterMaxScale, getClusterExtent } from "../utils/clusterUtil";*/
import LayerInfo from "../types/LayerInfo";
/*import FeaturesetInfo from "../types/FeaturesetInfo";
import XY from "../types/XY";
import * as alertInfoUtil from "../utils/alertInfoUtil";
import AlertInfo from "../types/AlertInfo";
import FerryAlertInfo from "../types/FerryAlertInfo";
import { getFeatureInfoById } from "../utils/featureInfoUtil";*/
/* Basemap */
import { getBasemapInfo, initBasemap } from "../layers/Basemaps";
/* Layers for popup */
/*import ParkRideLayer from "../layers/ParkRideLayer";
import CameraLayer, { toggleCluster } from "../layers/CameraLayer";
import PointRestrictionsLayer from "../layers/PointRestrictionsLayer";
import WeatherStationsLayer from "../layers/WeatherStationsLayer";
import MountainPassesLayer from "../layers/MountainPassesLayer";
import RoadAlertsLayer from "../layers/RoadAlertsLayer";
import RoadClosuresLayer from "../layers/LinearClosuresLayer"
import RestAreasLayer from "../layers/RestAreasLayer";
import FireIncidentLayer from "../layers/FireIncidentLayer";
import RoadsReferenceLayer from "../layers/RoadsReferenceLayer";
import BoundariesPlacesReferenceLayer from "../layers/BoundariesPlacesReferenceLayer";
import BorderCrossingLayer from "../layers/BorderCrossingsLayer";
import PointFerryRoutesLayer from "../layers/PointFerryRoutesLayer";
import RegionalAlertLayer, {
  centerFeatures as centerRegionalAlerts,
  layerId as regionalAlertLayerId,
} from "../layers/RegionalAlertLayer";*/
/* Popups */
import ZoomPopupView from "../components/ZoomPopupView.vue";
import CameraPopup from "../popups/CameraPopup.vue";
import ParkRidePopup from "../popups/ParkAndRidePopup.vue";
import PointRestrictionPopup from "../popups/PointRestrictionPopup.vue";
import MountainPassPopup from "../popups/MountainPassPopup.vue";
import WeatherStationsPopup from "../popups/WeatherStationPopup.vue";
import RestAreaPopup from "../popups/RestAreaPopup.vue";
import RoadAlertPopup from "../popups/RoadAlertPopup.vue";
import RoadClosurePopup from "../popups/RoadClosurePopup.vue";
import WildfirePointsPopup from "../popups/WildfirePointsPopup.vue";
import BorderCrossingPopup from "../popups/BorderCrossingPopup.vue";
import RegionalAlertPopup from "../popups/RegionalAlertPopup.vue";
import FerryRoutesPopup from "../popups/FerryRoutesPopup.vue";
/* Components */
import LeftPaneView from "../components/LeftPaneView.vue";
import BannerView from "../components/BannerView.vue";
import BasemapView from "../components/BasemapView.vue";
import CoordinatesView from "../components/CoordinatesView.vue";
import MyLocationView from "../components/MyLocationView.vue";
import ZoomButtonView from "../components/ZoomButtonView.vue";
import AlertView from "../components/AlertView.vue";
//import AdView from "../components/AdView.vue";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
/*import { hasParentClass } from "../utils/miscUtil";
import { showPopup, closePopup, displayZoomPopup, hideZoomPopup} from "../utils/popupUtil";
import BasemapInfo from "@/types/BasemapInfo";
import {validateRouteString, validateQueryParams} from '../utils/urlParamUtil';*/
import Basemap from "@arcgis/core/Basemap";
//import { dispatchError } from "@/utils/URLParamErrorMessages";
export default defineComponent({
  components: {
    /*ZoomPopupView,
    CameraPopup,
    ParkRidePopup,
    PointRestrictionPopup,
    MountainPassPopup,
    WeatherStationsPopup,
    RestAreaPopup,
    RoadAlertPopup,
    RoadClosurePopup,
    WildfirePointsPopup,
    BorderCrossingPopup,
    RegionalAlertPopup,
    FerryRoutesPopup,*/
    LeftPaneView,
    BasemapView,
    CoordinatesView,
    MyLocationView,
    ZoomButtonView,
   // AlertView,
    //AdView,
    BannerView,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    /*const mapLoaded = ref<boolean>(false);
    setTimeout(() => {
      mapLoaded.value = true;
    }, 9000);*/
    //const alerts = ref<AlertInfo[]>([]);
    //const ferryAlerts = ref<FerryAlertInfo[]>([]);
    const config = getConfig();
    /*alertInfoUtil.initStateAlerts(config.stateAlerts);
    alertInfoUtil
      .getStateAlerts()
      .then((result) => {
        alerts.value = result;
      })
      .catch((err) => {
        store.commit("addServiceAlert", "Statewide alerts");
        console.error(err);
      });
    alertInfoUtil.initFerryAlerts(config.ferryAlerts);
    // Zoom popup...
    const zoomPopupVisible = ref(false);
    const zoomPopupLabel = ref("");
    const zoomPopupX = ref(0);
    const zoomPopupY = ref(0);*/
    let zoomExtent: Extent | undefined;
    let mapDiv: HTMLDivElement;

    // Setup event handler for metro zoom...
    let zoomEventIsOn = false;
    const zoomMetroEventHandler = () => {
      if (zoomExtent) {
        //zoomToMetroArea(zoomExtent);
        zoomExtent = undefined;
      }
      if (zoomEventIsOn) {
        mapDiv.removeEventListener("click", zoomMetroEventHandler);
        zoomEventIsOn = false;
      }
      //zoomPopupVisible.value = false;
      mapDiv.style.cursor = "auto";
    };

    // Feature Popup...
    /*const popupXY = ref<XY | undefined>();
    const popupFeatureset = ref<FeaturesetInfo>({ layerId: "", ids: [] });
    const closePopupFunction = () => {
      closePopup(popupFeatureset,popupXY);
    };*/

    // Setup events on the operational layers...
    let pointerMoveHandle: { remove: () => void } | undefined;
    let clickHandle: { remove: () => void } | undefined;
    const initOperationalLayerEvents = (
      mapDiv: HTMLDivElement,
      esriMap: typeof import("../esri-stuff/esriMap")
    ) => {
      /*const lyrs = esriMap.validateLayerList([
        RoadClosuresLayer(),
        ParkRideLayer(),
        CameraLayer(),
        PointRestrictionsLayer(),
        WeatherStationsLayer(),
        MountainPassesLayer(),
        RestAreasLayer(),
        RoadAlertsLayer(),
        FireIncidentLayer(),
        RoadsReferenceLayer(),
        BoundariesPlacesReferenceLayer(),
        BorderCrossingLayer(),
        RegionalAlertLayer(),
        PointFerryRoutesLayer(),
        ZoomExtentLayer,
      ]);
      const opLayerOpts = {
        include: lyrs,
      };
      if (pointerMoveHandle) {
        pointerMoveHandle.remove();
        pointerMoveHandle = undefined;
      }
      pointerMoveHandle = mapView.on(["pointer-move"], (event) => {
        // Change pointer when the cursor is on a feature...
        const pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
        store.commit("setPointerX", pt.longitude);
        store.commit("setPointerY", pt.latitude);
        mapView.hitTest(event, opLayerOpts).then((response) => {
          const pt = esriMap.mapView.toMap({ x: event.x, y: event.y });
          store.commit("setPointerX", pt.longitude);//USED BY LAT LONG WIDGET, NECESSARY
          store.commit("setPointerY", pt.latitude);//USED BY LAT LONG WIDGET, NECESSARY
          if (response.results.length > 0) {
            const zoomFound = response.results.map(element=>{
              return element.graphic.layer.title
            });
            if(zoomFound.includes("Metro Areas")){
              mapDiv.style.cursor = "zoom-in";
              displayZoomPopup(event,response, esriMap, zoomPopupX,zoomPopupY,zoomExtent, zoomPopupLabel, zoomPopupVisible, store);
            }
            else{
              mapDiv.style.cursor = "pointer";
              hideZoomPopup(zoomPopupX,zoomPopupY, zoomPopupLabel);
            }
          } else {
            mapDiv.style.cursor = "auto";
            hideZoomPopup(zoomPopupX,zoomPopupY, zoomPopupLabel);
          }
        });
      });*/
      // MapView click event handler for showing popups...
      if (clickHandle) {
        clickHandle.remove();
        clickHandle = undefined;
      }
      clickHandle = esriMap.mapView.on("click", (clickEvent) => {
        if (zoomEventIsOn) {
          return;
        }
        // Check if feature is clicked on...
        /*esriMap.mapView.hitTest(clickEvent, opLayerOpts).then((response) => {
          const target = clickEvent.target as HTMLElement;
          if (hasParentClass(target, "alert-content") == false) {
            hidePointInteractionGraphics("line-restrictions-layer", esriMap.webmap);
            hidePointInteractionGraphics("ferry-routes-lines-layer", esriMap.webmap);
            hidePointInteractionGraphics("line-road-alerts-layer", esriMap.webmap);
          }
          if (response.results.length) {
            // Check if metro area layer was clicked on...
            const zoomExtentResult = response.results.filter((each) => {
              return each.graphic.layer === ZoomExtentLayer;
            });
            if (zoomExtentResult.length) {
              zoomToMetroArea(zoomExtentResult[0].graphic.geometry.extent);
              return;
            }
            // Operational layer was clicked...
            const resultsByLayer: {
              info: LayerInfo;
              layer: Layer;
              results: { graphic: Graphic; mapPoint: Point }[];
            }[] = [];
            response.results.forEach((eachResult) => {
              const arrayFound = resultsByLayer.find(
                (eachArray) => eachArray.layer === eachResult.graphic.layer
              );
              if (arrayFound) {
                arrayFound.results.push(eachResult);
              } else {
                const layerInfo = store.getters.getLayerInfo(eachResult.graphic.layer.id);
                if (layerInfo) {
                  resultsByLayer.push({
                    info: layerInfo,
                    layer: eachResult.graphic.layer,
                    results: [eachResult],
                  });
                }
              }
            });
            // Pick the top most layer...
            let maxIdx = 0;
            resultsByLayer.forEach((eachResultSet) => {
              if (eachResultSet.info.index && eachResultSet.info.index > maxIdx) {
                maxIdx = eachResultSet.info.index;
              }
            });
            const results2Show = resultsByLayer.find(
              (eachResultSet) => eachResultSet.info.index === maxIdx
            );
            if (results2Show) {
              const g = results2Show.results[0].graphic;
              store.commit("setSelectedFeatures",g as Graphic);
              const layer = g.layer as FeatureLayer;
              if (
                (layer.id === "traffic-camera-layer" &&
                !layer.featureReduction &&
                esriMap.mapView.scale < clusterMaxScale)||
                (layer.id === "road-alerts-layer")
              ) {
                // If zoomed more than cluster max scale, and features are still overlapping, then show multiple features...
                const query = layer.createQuery();
                // Select all features within the set pixels...
                // query.geometry = esriMap.bufferByPixels(10, undefined, g.geometry as Point);
                query.geometry = g.geometry;
                query.distance = esriMap.pixel2meter(10, undefined, g.geometry as Point);
                query.units = "meters";
                query.spatialRelationship = "intersects";
                const uniqueIdField:string = getUniqueIdName((g.layer as FeatureLayer).id)//get unique id field because it is a json layer
                layer.queryFeatures(query).then((results) => {
                  const ids = results.features.map((eachFeature) => {
                    return eachFeature.attributes[uniqueIdField]
                  });
                  showPopup(g.layer.id, ids,popupFeatureset,popupXY);
                  if(layer.id === "road-alerts-layer"){//display interaction graphics if road alerts layer
                    if(results.features[0].attributes.lineMarker){
                      displayPointInteractionGraphics(
                          "line-road-alerts-layer",
                          esriMap.webmap,
                          "EventID",
                          `${results.features[0].attributes[uniqueIdField]}`
                        );
                    }
                  }
                });
              }
              // Deal with cluster...
              else if (g.isAggregate) {
                if(g.layer.id=="traffic-camera-layer"){
                  getClusterExtent(g, results2Show.layer as FeatureLayer, esriMap.mapView).then(
                    (clusterExtent) => {
                      esriMap.zoomToExtent(clusterExtent.expand(1.5));
                    }
                  );
                }
                else{
                  const uid = getUniqueIdName(g.layer.id)
                  const id = g.attributes[uid];
                  showPopup(results2Show.layer.id, [id],popupFeatureset,popupXY)
                }
              } else {
                // Not aggregate...
                const uid = getUniqueIdName(g.layer.id)
                const id = g.attributes[uid];
                // get lines for restriciton point click
                if (
                  g.layer.id === "point-restrictions-layer" ||
                  g.layer.id === "road-alerts-layer"
                ) {
                  console.log(g.layer.id)
                  const uniqueIdField:string = getUniqueIdName((g.layer as FeatureLayer).id)//get unique id field because it is a json layer
                  getFeatureInfoById(id,uniqueIdField, (g.layer as FeatureLayer)).then((result) => {
                    if (g.layer.id === "point-restrictions-layer") {
                      console.log(result)
                      displayPointInteractionGraphics(
                        "line-restrictions-layer",
                        esriMap.webmap,
                        "UniqueId",
                        `${result?.attributes.UniqueId}`
                      );
                    }
                    else {
                      showPopup(results2Show.layer.id, [id],popupFeatureset,popupXY);
                    }
                  });
                }
                if (g.layer.id === "ferry-routes-points-layer") {
                  // Display line...
                  const uniqueIdField:string = getUniqueIdName((g.layer as FeatureLayer).id)//get unique id field because it is a json layer
                  getFeatureInfoById(id,uniqueIdField, (g.layer as FeatureLayer)).then((result) => {
                    displayPointInteractionGraphics(
                      "ferry-routes-lines-layer",
                      esriMap.webmap,
                      "FerryRouteID",
                      `${result?.attributes.FerryRouteID}`
                    );
                    showPopup(g.layer.id, [id],popupFeatureset,popupXY);
                  });
                } else {
                  showPopup(results2Show.layer.id, [id],popupFeatureset,popupXY);
                }
                removeGraphicsByType("selectedGraphic");
              }
            }
          } else {
            const target = clickEvent.target as HTMLElement;
            if (hasParentClass(target, "alert-content") == false||hasParentClass(target, "copyMapButton")) {
              hidePointInteractionGraphics("line-restrictions-layer", esriMap.webmap);
              hidePointInteractionGraphics("ferry-routes-lines-layer", esriMap.webmap);
              hidePointInteractionGraphics("line-road-alerts-layer", esriMap.webmap);
              removeGraphicsByType("selectedGraphic");
              removeGraphicsByType("myLocation"); //remove "my location" graphic
              //No feature exist...
              closePopup(popupFeatureset,popupXY);
            }
          }
        });*/
      });
    };

    onMounted(async () => {
      const appConfig = getConfig();
    //#region initialize esri map
      const esriMap = await import("../esri-stuff/esriMap");
      mapDiv = document.getElementById("esri-map-view") as HTMLDivElement;
      esriMap.init(mapDiv);
      store.commit("setMapSize", {// Set the initial map size in the state store...
        width: esriMap.mapView.width,
        height: esriMap.mapView.height,
      });
      esriMap.mapView.on("layerview-create-error", (event) => {
          store.commit("addServiceAlert", event.layer.title);
      });
      await initBasemap(appConfig.basemap);//initialize both basemaps
      store.commit("setBasemap", "wsdot");
      // Read config, then load operational layers...
      const lyrInfos = await esriMap.loadOperationalLayers();//
      store.commit("setLayerInfos", lyrInfos);
      const currentRouteName = computed(() => route)
    //#endregion
      store.commit("setCurrentExtent", esriMap.mapView.extent);//set current extent on initialization (necessary for copy map link);
      
      //set watcher to turn off initial loader screen
      const mapLayers = esriMap.getLayers() as Collection<Layer>;
      const vlPromises = [] as Array<Promise<LayerView>>;
      const loadedPromises = [] as Array<Promise<unknown>>;
      mapLayers.forEach((layer) => {
        if (
          layer.type == "feature" &&
          layer.id !== "ferry-routes-points-layer" &&
          layer.loadStatus !== "failed"
        ) {
          vlPromises.push(mapView.whenLayerView(layer));
        }
      });
      await Promise.all(vlPromises).then((layerViews) => {
        layerViews.forEach((layerView) => {
          loadedPromises.push(WatchUtils.whenFalseOnce(layerView, "updating"));
        });
        return Promise.all(loadedPromises)
          .then(() => {
            store.commit("setInitializing", {
              isInitializing: false,
            }); /***TODO: use this to wait until non-feature layers are also ready***/
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
      /* Set layer list here before the rest of the map is ready, so we can show the layer list UI early.
       * Otherwise user will see a map without layer list until everything is ready. */
      store.dispatch("watchLayers");
      store.dispatch("updateLayerVisibility");
      // Load regional alert after the other operations layers have been loaded so it won't slow down the map loading...
     // const alertLyrInfos = await esriMap.loadRegionalAlert();
      //store.commit("setLayerInfos", alertLyrInfos);
      // Store the layer indices in the state store...
      store.dispatch("updateLayerIndices");
      
      // Set refresh interval for layers & alerts...
      setInterval(() => {
        esriMap
          .refreshLayerData()
          .then((layerInfos) => store.dispatch("updateLayerStatus", layerInfos));
        /*alertInfoUtil
          .getStateAlerts()
          .then((result) => {
            alerts.value = result;
          })
          .catch((err) => {
            console.error(err);
          });
        alertInfoUtil.reloadFerryAlerts();*/
      }, appConfig.layerRefreshMinute * 60000); //60000
      // Setup events on the operational layers...
      initOperationalLayerEvents(mapDiv, esriMap);
      // Add quick zoom boxes around metro areas...
      // Gray out areas outside of the display area...
      esriMap.addOutOfExtentLayer();
    //#endregion
      
    esriMap.mapView.when().then(()=>{
      console.log("map loaded")
    })
      // Watch extent change...
      esriMap.mapView.watch("extent", (newValue, oldValue) => {
        // Keep track of map extent in the state store...
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          store.commit("setCurrentExtent", newValue);
        }
      });
      // Watch scale change...
      esriMap.mapView.watch("scale", (newValue, oldValue) => {
        store.commit("setScale", newValue);
        // Adjust cluster setting based on scale...
        if (oldValue > 0) {
          //toggleCluster(newValue, oldValue);
        }
      });
      // Watch map view size...
      esriMap.mapView.on("resize", (event) => {
        store.commit("setMapSize", {
          width: event.width,
          height: event.height,
        });
        adjustBottomControls();
      });
      // Watch center change...
      esriMap.mapView.watch("center", (newValue) => {
        store.commit("setCenter", { x: newValue.x, y: newValue.y });
      });
      //
      esriMap.mapView.watch("stationary", (newValue) => {
        if (!newValue) {
          return;
        }
        // Center the regional alert icon inside the visible area.
        // Except when the regional alert popup is open.
      });
    });
    //
    const bottomRightDiv = ref<HTMLDivElement>();
    const bottomLeftDiv = ref<HTMLDivElement>();
    const bottomCtrDiv = ref<HTMLDivElement>();
    const marginBottomContainer = ref("0 px");
    const adjustBottomControls = (event?: { width: number; height: number }) => {
      let ctrWidth: number;
      let ctrHeight: number;
      if (event) {
        ctrWidth = event.width;
        ctrHeight = event.height;
      } else if (bottomCtrDiv.value) {
        ctrWidth = bottomCtrDiv.value.offsetWidth;
        ctrHeight = bottomCtrDiv.value.offsetHeight;
      } else {
        return;
      }
      if (bottomRightDiv.value && bottomLeftDiv.value && store.state.mapSize.width) {
        if (
          ctrWidth + bottomRightDiv.value.offsetWidth + bottomLeftDiv.value.offsetWidth >
          store.state.mapSize.width
        ) {
          marginBottomContainer.value = ctrHeight + 16 + "px";
        } else {
          marginBottomContainer.value = "16px";
        }
      }
    };
    /**
     * Display error message
     *
     * @param event
     */
    const displayToast = (event: any) => {
      if (event[0] == false) {
        store.dispatch("showError", event[1].toString());
      }
    };
    return {
      bottomRightDiv,
      bottomLeftDiv,
      bottomCtrDiv,
      zoomMetroEventHandler,
      adjustBottomControls,
      marginBottomContainer,
      displayToast,
      store,
    };
  },
});
</script>

<template>
  <div id="esri-map-view"></div>
  <div
    id="map-bottom-left-container"
    class="w3-display-bottomleft w3-container"
    ref="bottomLeftDiv"
    :style="{ marginBottom: marginBottomContainer }"
  >
    <CoordinatesView />
  </div>
   <!--<div id="map-bottom-center-container" class="w3-display-bottommiddle" ref="bottomCtrDiv">
   <AdView @onResize="adjustBottomControls" />
  </div>-->
  <div
    id="map-bottom-right-container"
    class="w3-display-bottomright"
    ref="bottomRightDiv"
    :style="{ marginBottom: marginBottomContainer }"
  >
    <div class="map-bottom-right-container-row flex-row">
      <div class="map-bottom-right-container-column flex-column">
        <BasemapView />
      </div>
      <div class="map-bottom-right-container-column flex-column">
        <MyLocationView @locationFound="displayToast" />
        <ZoomButtonView />
      </div>
    </div>
  </div>
  <LeftPaneView />
  <BannerView />
</template>

<style scoped>
@import "https://js.arcgis.com/4.26/@arcgis/core/assets/esri/themes/light/main.css";

#esri-map-view {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  touch-action: none;
  overflow: hidden;
}
#map-bottom-right-container {
  display: inline-flex;
  margin-bottom: 16px;
}

.map-bottom-right-container-row {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-end;
  flex-direction: rtl;
  align-items: flex-end; /* move columns to rightmost end of row */
}

.map-bottom-right-container-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
#map-bottom-center-container {
  margin-bottom: 16px;
}
.esri-zoom {
  display: none;
}
</style>
