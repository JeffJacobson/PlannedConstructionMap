import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import esriConfig from "@arcgis/core/config";
// Layers
import * as TrafficLayer from "../layers/TrafficLayer";
import * as ParkRideLayer from "../layers/ParkRideLayer";
import * as CameraLayer from "../layers/CameraLayer";
import * as PointRestrictionsLayer from "../layers/PointRestrictionsLayer";
import * as LineRestrictionsLayer from "../layers/LineRestrictionsLayer";
import * as RoadAlertsLayer from "../layers/RoadAlertsLayer";
import * as WeatherLayer from "../layers/WeatherStationsLayer";
import * as MountainLayer from "../layers/MountainPassesLayer";
import * as FireIncidentsLayer from "../layers/FireIncidentLayer";
import * as FirePerimetersLayer from "../layers/FirePerimeterLayer";
import * as MileMakersLayer from "../layers/MileMarkersLayer";
import * as RoadsReferenceLayer from "../layers/RoadsReferenceLayer";
import * as BoundariesPlacesReferenceLayer from "../layers/BoundariesPlacesReferenceLayer";
import * as StateRouteShieldsLayer from "../layers/StateRouteShields";
import * as BorderCrossingsLayer from "../layers/BorderCrossingsLayer";
import * as RegionalAlertLayer from "../layers/RegionalAlertLayer";
import * as RestAreasLayer from "../layers/RestAreasLayer";
import * as FerryRoutesReferenceLayer from "../layers/ferryRoutesReferenceLayer";
import * as LineFerryRoutesLayer from "../layers/LineFerryRoutesLayer";
import * as PointFerryRoutesLayer from "../layers/PointFerryRoutesLayer";
import * as AlertAreaLayer from "../layers/AlertAreaLayer";
import * as LineRoadAlertsLayer from "../layers/LineRoadAlertsLayer";
import * as LinearClosuresLayer from "../layers/LinearClosuresLayer";
//
import * as extentUtil from "../utils/extentUtil";
import ZoomExtentLayer from "../layers/ZoomExtentLayer";
import { getConfig } from "../utils/appConfigUtil";
import { getBasemapInfo } from "../layers/Basemaps";
import * as layerUtil from "../utils/layerUtil";
import { isLayerInfo } from "../types/LayerInfo";
esriConfig.request.useIdentity = false;
const fullExtent = extentUtil.getEsriExtent("full");
// Initialize empty map, and load layers later...
export const webmap = new WebMap({});
export const mapView = new MapView({
    container: "esri-map-view",
    map: webmap,
    extent: fullExtent,
    constraints: {
        rotationEnabled: false,
        // Limit the map navigation. 
        // Note: This still allows navigation beyond the extent, but not infinitely.
        geometry: fullExtent,
        minScale: 4622324.434309,
        maxScale: 9027.977411
    },
    highlightOptions: {
        color: "#00ffff",
        haloColor: "#0000ff",
        fillOpacity: 0.25,
        haloOpacity: 1
    }
});
// Zoom buttons are replaced with the custom Vue components.
mapView.ui.remove("zoom");
//
/**
 * Initialize the map view
 *
 * @param container  - Container HTML Element
 */
export const init = (container) => {
    mapView.container = container;
    mapView.when()
        .then(() => {
        // Somehow map does not zoom enough, so set extent again here...
        mapView.extent = fullExtent;
    })
        .catch(error => {
        console.warn("Failed to initialize map. Error: ", error);
    });
};
/** Store the default layer visibility. This is used by Saved Map function. */
export const defaultLayerProps = [];
/**
 * Get config and get apiKey and URL, then initialize layers and add to map..
 *
 * @returns The list of IDs of the layers that failed to load.
 */
export const loadOperationalLayers = async () => {
    const config = getConfig();
    // Load async ones in parallel...
    const promises = [];
    promises.push(LineFerryRoutesLayer.initLayer(config.ferryRouteLines));
    promises.push(BorderCrossingsLayer.initLayer(config.borderCrossings));
    promises.push(ParkRideLayer.initLayer(config.parkAndRides));
    promises.push(RestAreasLayer.initLayer(config.restAreas));
    promises.push(WeatherLayer.initLayer(config.weatherStations, mapView));
    promises.push(MountainLayer.initLayer(config.mountainPasses));
    promises.push(LineRestrictionsLayer.initLayer(config.lineRestrictions));
    promises.push(PointRestrictionsLayer.initLayer(config.pointRestrictions));
    promises.push(CameraLayer.initLayer(config.cameras));
    promises.push(RoadAlertsLayer.initLayer(config.currentRoadAlertPoint));
    promises.push(LineRoadAlertsLayer.initLayer(config.currentRoadAlertLine));
    promises.push(LinearClosuresLayer.initLayer(config.currentRoadClosureLine));
    promises.map(eachPromise => eachPromise.catch(error => error));
    // Load sync ones...
    const infos = [];
    infos.push(RoadsReferenceLayer.initLayer(config.esriRoadsReferenceLayer));
    infos.push(BoundariesPlacesReferenceLayer.initLayer(config.esriPlacesReferenceLayer));
    infos.push(FerryRoutesReferenceLayer.initLayer(config.ferryRoutesReferenceLayer));
    infos.push(TrafficLayer.initLayer(config.traffic, config.layerRefreshMinute));
    infos.push(StateRouteShieldsLayer.initLayer(config.stateRouteShieldsLayer));
    infos.push(MileMakersLayer.initLayer(config.mileMarkers));
    infos.push(PointFerryRoutesLayer.initLayer(config.ferryRoutePoints));
    // Load fire layers...
    infos.push(FireIncidentsLayer.initLayer(config.fireIncidents));
    const fireIncidentLayer = FireIncidentsLayer.default();
    if (fireIncidentLayer) {
        const incidentNames = await FireIncidentsLayer.getIncidentNames();
        //Needed to filter fire perimeters to just those within the state
        if (incidentNames.length > 0) {
            infos.push(FirePerimetersLayer.initLayer(config.firePerimeters, incidentNames));
        }
    }
    // Wait for all the async ones to finish loading...
    const results = await Promise.all(promises);
    results.forEach(eachResult => {
        if (isLayerInfo(eachResult)) {
            infos.push(eachResult);
        }
        else {
            console.warn(eachResult);
        }
    });
    // Create list of layers to load to the map...
    const lyrs = [];
    const addToList = (layer) => {
        if (layer) {
            lyrs.push(layer);
        }
    };
    addToList(RoadsReferenceLayer.default());
    addToList(BoundariesPlacesReferenceLayer.default());
    addToList(FerryRoutesReferenceLayer.default());
    addToList(TrafficLayer.default());
    addToList(LinearClosuresLayer.default());
    addToList(LineFerryRoutesLayer.default());
    addToList(LineRoadAlertsLayer.default());
    addToList(StateRouteShieldsLayer.default());
    addToList(FirePerimetersLayer.default());
    addToList(fireIncidentLayer);
    addToList(MileMakersLayer.default());
    addToList(BorderCrossingsLayer.default());
    addToList(ParkRideLayer.default());
    addToList(RestAreasLayer.default());
    addToList(WeatherLayer.default());
    addToList(MountainLayer.default());
    addToList(LineRestrictionsLayer.default());
    addToList(PointRestrictionsLayer.default());
    addToList(CameraLayer.default());
    addToList(PointFerryRoutesLayer.default());
    addToList(RoadAlertsLayer.default());
    // The first one in the array will be displayed at the bottom of the map... 
    webmap.addMany(lyrs);
    // Store the default visibility...
    webmap.layers.forEach((eachLyr) => {
        defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });
    return infos;
};
/**
 * Filter out the layers that did not load.
 *
 * @param list  - List of layers to validate
 * @returns An array of valid layers.
 */
export const validateLayerList = (list) => {
    const validLyrs = list.filter(isLayer);
    return validLyrs;
};
/**
 * Type guard for the layer object
 *
 * @param layer  - An object that may or may not be a layer.
 * @returns A boolean indicating if the input is a layer.
 */
export const isLayer = (layer) => {
    return !!layer;
};
/**
 * Load regional alert point and polygon layers separately from the other operational layers.
 * Returns layer IDs of the layers that failed to load.
 */
export const loadRegionalAlert = async () => {
    const config = getConfig();
    const infos = await RegionalAlertLayer.initLayer(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries);
    const pointLayer = RegionalAlertLayer.default();
    if (pointLayer) {
        webmap.add(pointLayer);
    }
    const areaLayer = AlertAreaLayer.default();
    if (areaLayer) {
        webmap.add(areaLayer, 0);
    }
    return infos;
};
/**
 * Reload data for some layers.
 */
export const refreshLayerData = async () => {
    const config = getConfig();
    const promises = [];
    promises.push(RegionalAlertLayer.reloadData(config.regionalAlerts, config.countyBoundaries, config.regionBoundaries));
    promises.push(layerUtil.reloadData(config.currentRoadAlertPoint, RoadAlertsLayer.default()));
    promises.push(layerUtil.reloadData(config.currentRoadAlertLine, LineRoadAlertsLayer.default()));
    promises.push(layerUtil.reloadData(config.currentRoadClosureLine, LinearClosuresLayer.default()));
    promises.push(layerUtil.reloadData(config.pointRestrictions, PointRestrictionsLayer.default()));
    promises.push(layerUtil.reloadData(config.lineRestrictions, LineRestrictionsLayer.default()));
    promises.push(layerUtil.reloadData(config.mountainPasses, MountainLayer.default()));
    promises.push(layerUtil.reloadData(config.weatherStations, WeatherLayer.default()));
    promises.push(layerUtil.reloadData(config.borderCrossings, BorderCrossingsLayer.default()));
    const results = await Promise.all(promises);
    const infos = [];
    results.forEach(eachResult => {
        if (eachResult) {
            if (Array.isArray(eachResult)) {
                infos.push(...eachResult);
            }
            else if (isLayerInfo(eachResult)) {
                infos.push(eachResult);
            }
        }
    });
    return infos;
};
/**
 * Attempts to zoom to a point
 *
 * @param point  - A point
 * @param numLevels  - The number of levels
 * @returns True if successful, false otherwise.
 */
export const tryZoomToPoint = (point, numLevels) => {
    let isSuccess = true;
    if (!numLevels) {
        numLevels = 1;
    }
    mapView.center = point;
    const orgLevel = mapView.zoom;
    mapView.zoom = mapView.zoom += numLevels;
    if (mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
};
/**
 * Zoom centered at the specified location
 *
 * @param point  - The center location
 * @param zoomLevel  - The zoom level to zoom into.
 * If numLevels is also specified, that will take precedence over this value.
 * @returns A boolean promise indicating of the zoom successfully occurred.
 */
export const tryZoomToPointAsync = async (point, zoomLevel) => {
    let isSuccess = true;
    const orgLevel = mapView.zoom;
    await mapView.goTo({
        target: point,
        zoom: zoomLevel
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("tryZoomToPointAsync failed: " + error);
    });
    if (mapView.zoom === orgLevel) {
        // Cannot zoom in any more.
        isSuccess = false;
    }
    return isSuccess;
};
/**
 * Zoom to the maximum level at the specified point.
 *
 * @param point  - The point to zoom to
 */
export const zoomToMax = async (point) => {
    await mapView.goTo({
        target: point,
        scale: getZoomLevel(-1).scale
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToMax failed: " + error);
    });
};
/**
 * Zooms to the metro area of the given extent.
 *
 * @param extent  - An extent
 */
export const zoomToMetroArea = (extent) => {
    mapView.extent = extent.expand(2);
    ZoomExtentLayer.visible = false;
    // Remember the scale zoomed into so it can detect when map is zoomed out.
    const zoomExtentLayerMaxZoom = mapView.zoom;
    // Set watch to make the layer visible again when user zoom out 2+ levels.
    const watchHandle = whenTrue(mapView, "stationary", () => {
        // Note: Allow users to zoom out one level without showing the extent box, so they still click on features.
        if (mapView.zoom < zoomExtentLayerMaxZoom - 1) {
            ZoomExtentLayer.visible = true;
            // Watch is no longer needed.
            watchHandle.remove();
        }
    });
};
/**
 * Zooms to a given extent.
 *
 * @param extent  - An extent to zoom to.
 */
export const zoomToExtent = async (extent) => {
    await mapView.goTo(extent, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToExtent failed: " + error);
    });
};
/** Zoom levels and corresponding scales */
let zoomLevels;
/**
 * Get the scale by the number levels from the minimum scale.
 *
 * @param numLevelsFromMin  - Number of levels from the minimum scale.
 * For example, 0 is the min scale. 3 is the fourth level from the min scale.
 * You can also specify number of levels from the maximum scale by using the negative value.
 * For example -1 is the max scale. -2 is the second level from the max scale.
 * @returns Zoom level information
 */
export const getZoomLevel = (numLevelsFromMin) => {
    if (!zoomLevels) {
        const info = getBasemapInfo("wsdot");
        if (info.basemap) {
            const lyr = info.basemap.baseLayers.getItemAt(0);
            const tile = lyr;
            const lods = tile.tileInfo.lods;
            zoomLevels = lods.map((x) => {
                return { level: x.level, scale: x.scale };
            });
            zoomLevels.sort((a, b) => a.level - b.level);
        }
        else {
            zoomLevels = [];
        }
    }
    const item = zoomLevels.slice(numLevelsFromMin);
    if (item) {
        return item[0];
    }
    else if (numLevelsFromMin < 0) {
        return zoomLevels[0];
    }
    else {
        return zoomLevels.slice(-1)[0];
    }
};
/**
 * Converts map coordinates to screen coordinates.
 *
 * @param mapX  - X coordinate
 * @param mapY  - Y coordinate
 * @returns a point object.
 */
export const toScreenXY = (mapX, mapY) => {
    const pt = toPoint(mapX, mapY);
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
};
/**
 * Converts X and Y coordinates to a {@link Point} object.
 *
 * @param mapX  - X
 * @param mapY  - Y
 * @returns a Point object.
 */
export const toPoint = (mapX, mapY) => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: mapView.spatialReference });
    return pt;
};
/**
 * Check the new extent after panning against the max extent allowed and report the direction from the extent.
 *
 * @param shiftX  - Shift X
 * @param shiftY  - Shift Y
 * @returns A string matching the pattern /[ins][iwe]/
 * - First char: vertical direction = i/n/s (inside/north/south)
 * - Second char: horizontal direction = i/w/e (inside/west/east)
 */
export const checkPannedExtent = (shiftX, shiftY) => {
    const topLeft = mapView.toMap({ x: -1 * shiftX, y: -1 * shiftY });
    const bottomRight = mapView.toMap({ x: mapView.width - shiftX, y: mapView.height - shiftY });
    const topLeftDir = extentUtil.getOutOfBoundDirection(topLeft, fullExtent);
    const bottomRightDir = extentUtil.getOutOfBoundDirection(bottomRight, fullExtent);
    // Positive = panning down/south => check the top, otherwise check the bottom...
    let outOfBoundsDir = shiftY > 0 ? topLeftDir[0] : bottomRightDir[0];
    // Positive = panning east/right => check the left, otherwise check the right side...
    outOfBoundsDir += shiftX > 0 ? topLeftDir[1] : bottomRightDir[1];
    return outOfBoundsDir;
};
/**
 * Pan Map using GoTo()
 *
 * @param shiftX  -
 * positive = pan east, negative = pan west
 * @param shiftY -
 * Positive = pan south, negative = pan north
 * @returns
 * If successful or exception, return true/false. Otherwise return the actual amount pan was panned.
 */
export const panMap = async (shiftX, shiftY) => {
    const screenCenter = mapView.toScreen(mapView.center);
    const newCenter = mapView.toMap({
        x: screenCenter.x - shiftX,
        y: screenCenter.y - shiftY,
    });
    const oldCenter = mapView.center;
    let tryCount = 0;
    const diffShift = { x: -1, y: -1 };
    const actualShift = { x: 0, y: 0 };
    try {
        while (tryCount < 4 && (Math.abs(diffShift.x) >= 1 || Math.abs(diffShift.y) >= 1)) {
            tryCount++;
            // GoTo() does not work as expected for various reasons, so try it a few times if not successful.
            try {
                await mapView.goTo(newCenter, {
                    duration: 300,
                    easing: "ease-in"
                });
            }
            catch (err) {
                console.error("mapView.goTo failed: " + err);
            }
            // Figure out the amount moved in reality...
            const newScreen = mapView.toScreen(mapView.center);
            const oldScreen = mapView.toScreen(oldCenter);
            actualShift.x = oldScreen.x - newScreen.x;
            actualShift.y = oldScreen.y - newScreen.y;
            diffShift.x = shiftX - actualShift.x;
            diffShift.y = shiftY - actualShift.y;
        }
        if (Math.abs(diffShift.x) < 1 && Math.abs(diffShift.y) < 1) {
            return true;
        }
        else {
            console.warn("panMap: fail " + JSON.stringify(diffShift));
            return { actualShift: actualShift };
        }
    }
    catch (err) {
        console.error("panMap failed: " + err);
        return false;
    }
};
/**
 * Gets the layer with the specified "id"
 *
 * @param id  - Layer ID
 * @returns A Layer.
 */
export const getLayer = (id) => {
    return webmap.findLayerById(id);
};
/**
 * Gets the webmap layers.
 *
 * @returns A collection of layers.
 */
export const getLayers = () => {
    return webmap.layers;
};
/**
 * NOTE: This function only returns each feature if one of the following conditions is met:
 * - maxCount is not set  *
 * - The number of features is less than the maxCount.
 * - All the features are at the identical location.
 *
 * @param clusterGraphic  - Cluster Graphic
 * @param layer  - Layer
 * @param maxCount  - Max count
 * @returns An array of IDs or undefined
 */
export const getIdsFromCluster = async (clusterGraphic, layer, maxCount) => {
    const lyr = layer;
    if (!lyr) {
        throw "Invalid layer type was specified.";
    }
    const layerView = await mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    query.outFields = [lyr.objectIdField];
    const result = await layerView.queryFeatures(query);
    let doReturn = false;
    if (!maxCount || result.features.length <= maxCount) {
        doReturn = true;
    }
    else {
        let identical = true;
        const pt0 = result.features[0].geometry;
        for (let i = 1; i < result.features.length; i++) {
            identical = pt0.equals(result.features[i].geometry);
            if (!identical) {
                break;
            }
        }
        if (identical) {
            // All points are located on the same spot!
            doReturn = true;
        }
    }
    if (doReturn) {
        const ids = result.features.map((feature) => { return feature.attributes[lyr.objectIdField]; });
        return ids;
    }
};
/**
 * Converts pixel to meters
 *
 * @param distancePixel  - distance pixel
 * @param screenPoint  - screen point
 * @param mapPoint  - map point
 * @returns distance in meters
 */
export const pixel2meter = (distancePixel, screenPoint, mapPoint) => {
    if (!screenPoint && mapPoint) {
        screenPoint = mapView.toScreen(mapPoint);
    }
    if (!mapPoint && screenPoint) {
        mapPoint = mapView.toMap(screenPoint);
    }
    if (screenPoint && mapPoint) {
        const ptShift = mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
        const mapDist = Math.abs(ptShift.x - mapPoint.x);
        return mapDist;
    }
    else {
        return -1;
    }
};
// export const bufferByPixels = (distancePixel: number, screenPoint?: XY, mapPoint?: Point): Polygon => {
//     if (!screenPoint && mapPoint) {
//         screenPoint = mapView.toScreen(mapPoint);
//     }
//     if (!mapPoint && screenPoint) {
//         mapPoint = mapView.toMap(screenPoint);
//     }
//     if (screenPoint && mapPoint) {
//         const ptShift = mapView.toMap({ x: screenPoint.x + distancePixel, y: screenPoint.y });
//         const mapDist = Math.abs(ptShift.x - mapPoint.x);
//         const outBuff = geodesicBuffer(
//             mapPoint,
//             mapDist,
//             "meters"
//         ) as Polygon;
//         return outBuff;
//     }
//     else {
//         throw "Need to specify either screen or map point.";
//     }
// }
/** Highlight feature */
let highlight;
/**
 * Highlights the specified feature.
 *
 * @param featureInfo  - Feature info to be highlighted.
 */
export const highlightFeature = (featureInfo) => {
    const layer = getLayer(featureInfo.layerId);
    mapView.whenLayerView(layer).then((layerView) => {
        const query = layer.createQuery();
        query.where = `${layer.objectIdField} = ${featureInfo.id}`;
        layer.queryFeatures(query).then((result) => {
            if (highlight) {
                highlight.remove();
            }
            highlight = layerView.highlight(result.features);
        });
    });
};
/**
 *
 */
export const removeHighlight = () => {
    if (highlight) {
        highlight.remove();
    }
};
/*** grey out outside ***/
// const outOfExtentLayer = new GraphicsLayer();
// const displayExtent = extentUtil.getEsriExtent("full").expand(1.2);
/**
 * Adds out of extent layer
 */
export const addOutOfExtentLayer = () => {
    const outOfExtentLayer = new GraphicsLayer();
    const symbol = new SimpleFillSymbol({
        style: "solid",
        color: [256, 256, 256, 0.95],
        outline: {
            style: "solid",
            color: [256, 256, 256, 0.95],
        }
    });
    const geoms = extentUtil.getOutOfExtentPolygons();
    geoms.forEach((x) => {
        const g = new Graphic({
            geometry: x,
            symbol: symbol,
        });
        outOfExtentLayer.add(g);
    });
    webmap.add(outOfExtentLayer);
};
// export const updateOutOfExtentLayer = (): void => {
//     outOfExtentLayer.removeAll();
//     const symbol = new SimpleFillSymbol({
//         style: "solid",
//         color: [256, 256, 256, 0.95],
//         outline: {
//             style: "none"
//         }
//     });
//     const diffGeoms = difference(mapView.extent, displayExtent);
//     if (Array.isArray(diffGeoms)) {
//         for (const each of diffGeoms) {
//             const g = new Graphic({
//                 geometry: each,
//                 symbol: symbol,
//             })
//             outOfExtentLayer.add(g);
//         }
//     } else {
//         const g = new Graphic({
//             geometry: diffGeoms,
//             symbol: symbol,
//         })
//         outOfExtentLayer.add(g);
//     }
// }
//# sourceMappingURL=esriMap.js.map