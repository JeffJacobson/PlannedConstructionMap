//ESRI API
import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { whenTrue } from "@arcgis/core/core/watchUtils";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Extent from "@arcgis/core/geometry/Extent";
import Collection from "@arcgis/core/core/Collection";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Layer from "@arcgis/core/layers/Layer";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import esriConfig from "@arcgis/core/config";
// Utils
import * as extentUtil from "../utils/extentUtil";
import * as layerUtil from "../utils/layerUtil";
import { getConfig } from "../utils/appConfigUtil";
// Layers
import * as TrafficLayer from "../layers/TrafficLayer";
import * as LinePlannedConstructionLayer from "../layers/LinePlannedConstructionLayer";
import * as PointPlannedConstructionLayer from "../layers/PointPlannedConstructionLayer";
import * as RoadsReferenceLayer from "../layers/RoadsReferenceLayer";
import * as BoundariesPlacesReferenceLayer from "../layers/BoundariesPlacesReferenceLayer";
import * as StateRouteShieldsLayer from "../layers/StateRouteShields";
import * as FerryRoutesReferenceLayer from "../layers/ferryRoutesReferenceLayer";
import * as MileMarkersLayer from "../layers/MileMarkersLayer";
import { getBasemapInfo } from "../layers/Basemaps";
// Types
import LayerInfo, { isLayerInfo } from "../types/LayerInfo";
import { ExtentDirections } from "../types/ExtentInfo";
import FeatureInfo from "../types/FeatureInfo";
import XY from "../types/XY";

esriConfig.request.useIdentity = false
const fullExtent = extentUtil.getEsriExtent("full");

// Initialize empty map, and load layers later...
export const webmap = new WebMap({
});

export const mapView = new MapView({
    container: "esri-map-view",
    map: webmap,
    extent: fullExtent,
    constraints: {
        rotationEnabled: false, // Disables map rotation
        // Limit the map navigation. 
        // Note: This still allows navigation beyond the extent, but not infinitely.
        geometry: fullExtent,
        minScale:4622324.434309,
        maxScale:9027.977411
    },
    highlightOptions: {
       // color: "#00ffff", // Fill color
        //haloColor: "#0000ff", // Outline color
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
export const init = (container: HTMLDivElement): void => {
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
export const defaultLayerProps: { id: string, visible: boolean }[] = []

/**
 * Get config and get apiKey and URL, then initialize layers and add to map..
 * 
 * @returns The list of IDs of the layers that failed to load.
 */
export const loadOperationalLayers = async (): Promise<LayerInfo[]> => {
    const config = getConfig();
    // Load async ones in parallel...
    const promises = []
    promises.push(LinePlannedConstructionLayer.initLayer(config.plannedConstructionLine));
    promises.push(PointPlannedConstructionLayer.initLayer(config.plannedConstructionPoint));
    promises.map(eachPromise => eachPromise.catch(error => error));
    // Load sync ones...
    const infos: LayerInfo[] = [];//array of layerinfo instances, 
    infos.push(RoadsReferenceLayer.initLayer(config.esriRoadsReferenceLayer));
    infos.push(BoundariesPlacesReferenceLayer.initLayer(config.esriPlacesReferenceLayer));
    infos.push(FerryRoutesReferenceLayer.initLayer(config.ferryRoutesReferenceLayer));
    infos.push(TrafficLayer.initLayer(config.traffic, config.layerRefreshMinute));
    infos.push(StateRouteShieldsLayer.initLayer(config.stateRouteShieldsLayer));
    infos.push(MileMarkersLayer.initLayer(config.mileMarkers));
    // Wait for all the async ones to finish loading...
    const results = await Promise.all(promises);//returns array of layerinfo members
    results.forEach(eachResult => {
        if (isLayerInfo(eachResult)) { infos.push(eachResult); }
        else {
            console.warn(eachResult);
        }
    });

    // Create list of layers to load to the map...
    const lyrs: Layer[] = [];
    const addToList = (layer: Layer | undefined) => {
        if (layer) {
            lyrs.push(layer);
        }
    }
    
    addToList(RoadsReferenceLayer.default());
    addToList(BoundariesPlacesReferenceLayer.default());
    addToList(FerryRoutesReferenceLayer.default());
    //addToList(TrafficLayer.default());
    addToList(StateRouteShieldsLayer.default());
    addToList(MileMarkersLayer.default());
    addToList(LinePlannedConstructionLayer.default());
    addToList(PointPlannedConstructionLayer.default());
    // The first one in the array will be displayed at the bottom of the map... 
    webmap.addMany(lyrs);
    // Store the default visibility...
    webmap.layers.forEach((eachLyr) => {
        defaultLayerProps.push({ id: eachLyr.id, visible: eachLyr.visible });
    });
    return infos;
}
/**
 * Filter out the layers that did not load.
 *
 * @param list  - List of layers to validate
 * @returns An array of valid layers.
 */
export const validateLayerList = (list: (Layer | undefined)[]): Layer[] => {
    const validLyrs: Layer[] = list.filter(isLayer);
    return validLyrs;
}
/**
 * Type guard for the layer object
 *
 * @param layer  - An object that may or may not be a layer.
 * @returns A boolean indicating if the input is a layer.
 */
export const isLayer = (layer: Layer | undefined): layer is Layer => {
    return !!layer;
}
/**
 * Reload data for some layers.
 */
export const refreshLayerData = async (): Promise<LayerInfo[]> => {
    const config = getConfig();
    const promises = [];
    promises.push(layerUtil.reloadData(config.plannedConstructionLine, PointPlannedConstructionLayer.default()));
    promises.push(layerUtil.reloadData(config.plannedConstructionPoint, LinePlannedConstructionLayer.default()));
    const results = await Promise.all(promises);
    const infos: LayerInfo[] = [];
    results.forEach(eachResult => {
        if (eachResult) {
            if (Array.isArray(eachResult)) { infos.push(...eachResult); }
            else if (isLayerInfo(eachResult)) { infos.push(eachResult); }
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
export const tryZoomToPoint = (point: Point, numLevels?: number): boolean => {
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
}
/**
 * Zoom centered at the specified location
 *
 * @param point  - The center location
 * @param zoomLevel  - The zoom level to zoom into.
 * If numLevels is also specified, that will take precedence over this value.
 * @returns A boolean promise indicating of the zoom successfully occurred.
 */
export const tryZoomToPointAsync = async (point: Point, zoomLevel: number): Promise<boolean> => {
    let isSuccess = true;
    const orgLevel = mapView.zoom;
    await mapView.goTo({
        target: point,
        zoom: mapView.zoom+10
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
}

/**
 * Zoom to the maximum level at the specified point.
 * 
 * @param point  - The point to zoom to
 */
export const zoomToMax = async (point: Point): Promise<void> => {
    await mapView.goTo({
        target: point,
        scale: getZoomLevel(-1).scale
    }, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToMax failed: " + error);
    });
}

/**
 * Zooms to a given extent.
 * 
 * @param extent  - An extent to zoom to.
 */
export const zoomToExtent = async (extent: Extent): Promise<void> => {
    await mapView.goTo(extent, {
        duration: 300,
        easing: "ease-in"
    }).catch((error) => {
        console.error("zoomToExtent failed: " + error);
    });
}

/**
 * A zoom level and scale
 */
export interface ZoomLevel {
    /** zoom level */
    level: number,
    /** zoom scale */
    scale: number
}

/** Zoom levels and corresponding scales */
let zoomLevels: ZoomLevel[];
/**
 * Get the scale by the number levels from the minimum scale.
 *
 * @param numLevelsFromMin  - Number of levels from the minimum scale. 
 * For example, 0 is the min scale. 3 is the fourth level from the min scale.
 * You can also specify number of levels from the maximum scale by using the negative value.
 * For example -1 is the max scale. -2 is the second level from the max scale.
 * @returns Zoom level information
 */
export const getZoomLevel = (numLevelsFromMin: number): ZoomLevel => {
    if (!zoomLevels) {
        const info = getBasemapInfo("wsdot");
        if (info.basemap) {
            const lyr = info.basemap.baseLayers.getItemAt(0);
            const tile = lyr as TileLayer;
            const lods = tile.tileInfo.lods;
            zoomLevels = lods.map((x) => {
                return { level: x.level, scale: x.scale };
            });
            zoomLevels.sort((a, b) => a.level - b.level);
        }
        else { zoomLevels = []; }
    }
    const item = zoomLevels.slice(numLevelsFromMin);
    if (item) {
        return item[0];
    } else if (numLevelsFromMin < 0) {
        return zoomLevels[0];
    } else {
        return zoomLevels.slice(-1)[0];
    }
}

/**
 * Converts map coordinates to screen coordinates.
 * 
 * @param mapX  - X coordinate
 * @param mapY  - Y coordinate
 * @returns a point object.
 */
export const toScreenXY = (mapX: number, mapY: number): { x: number, y: number } => {
    const pt = toPoint(mapX, mapY);
    const screenPt = mapView.toScreen(pt);
    return { x: screenPt.x, y: screenPt.y };
}

/**
 * Converts X and Y coordinates to a {@link Point} object.
 * 
 * @param mapX  - X
 * @param mapY  - Y
 * @returns a Point object.
 */
export const toPoint = (mapX: number, mapY: number): Point => {
    const pt = new Point({ x: mapX, y: mapY, spatialReference: mapView.spatialReference });
    return pt;
}



/**
 * Check the new extent after panning against the max extent allowed and report the direction from the extent.
 *
 * @param shiftX  - Shift X
 * @param shiftY  - Shift Y
 * @returns A string matching the pattern /[ins][iwe]/
 * - First char: vertical direction = i/n/s (inside/north/south);
 * - Second char: horizontal direction = i/w/e (inside/west/east);
 */
export const checkPannedExtent = (shiftX: number, shiftY: number): ExtentDirections => {
    const topLeft = mapView.toMap({ x: -1 * shiftX, y: -1 * shiftY });
    const bottomRight = mapView.toMap({ x: mapView.width - shiftX, y: mapView.height - shiftY });
    const topLeftDir = extentUtil.getOutOfBoundDirection(topLeft, fullExtent);
    const bottomRightDir = extentUtil.getOutOfBoundDirection(bottomRight, fullExtent);
    // Positive = panning down/south => check the top, otherwise check the bottom...
    let outOfBoundsDir = shiftY > 0 ? topLeftDir[0] : bottomRightDir[0];
    // Positive = panning east/right => check the left, otherwise check the right side...
    outOfBoundsDir += shiftX > 0 ? topLeftDir[1] : bottomRightDir[1];
    return outOfBoundsDir as ExtentDirections;
}
/**
 * Pan Map using GoTo();
 *
 * @param shiftX  - 
 * positive = pan east, negative = pan west
 * @param shiftY - 
 * Positive = pan south, negative = pan north
 * @returns 
 * If successful or exception, return true/false. Otherwise return the actual amount pan was panned.
 */
export const panMap = async (shiftX: number, shiftY: number): Promise<{ actualShift: XY } | boolean> => {
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
            } catch (err) {
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
        } else {
            console.warn("panMap: fail " + JSON.stringify(diffShift));
            return { actualShift: actualShift };
        }
    } catch (err) {
        console.error("panMap failed: " + err);
        return false;
    }
}

/**
 * Gets the layer with the specified "id"
 * 
 * @param id  - Layer ID
 * @returns A Layer.
 */
export const getLayer = (id: string): Layer => {
    return webmap.findLayerById(id);
}
/**
 * Gets the webmap layers.
 * 
 * @returns A collection of layers.
 */
export const getLayers = (): Collection<Layer> => {
    return webmap.layers;
}
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
export const getIdsFromCluster = async (clusterGraphic: Graphic, layer: Layer, maxCount?: number): Promise<number[] | undefined> => {
    const lyr = layer as FeatureLayer;
    if (!lyr) {
        throw "Invalid layer type was specified.";
    }
    const layerView = await mapView.whenLayerView(lyr);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    const uid = layerUtil.getUniqueIdName(clusterGraphic.layer.id)
    query.aggregateIds = [clusterGraphic.attributes[uid]];
    query.outFields = [lyr.objectIdField];
    const result = await layerView.queryFeatures(query);
    let doReturn = false;
    if (!maxCount || result.features.length <= maxCount) {
        doReturn = true;
    }
    else {
        let identical = true;
        const pt0 = result.features[0].geometry as Point;
        for (let i = 1; i < result.features.length; i++) {
            identical = pt0.equals(result.features[i].geometry as Point);
            if (!identical) { break; }
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
}

/**
 * Converts pixel to meters
 * 
 * @param distancePixel  - distance pixel
 * @param screenPoint  - screen point
 * @param mapPoint  - map point
 * @returns distance in meters
 */
export const pixel2meter = (distancePixel: number, screenPoint?: XY, mapPoint?: Point): number => {
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
}

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
let highlight: __esri.Handle;

/**
 * Highlights the specified feature.
 * 
 * @param featureInfo  - Feature info to be highlighted.
 */
export const highlightFeature = (featureInfo: FeatureInfo): void => {
    const layer = getLayer(featureInfo.layerId) as FeatureLayer;
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
}


/**
 *
 */
export const removeHighlight = (): void => {
    if (highlight) {
        highlight.remove();
    }
}
/*** grey out outside ***/
// const outOfExtentLayer = new GraphicsLayer();
// const displayExtent = extentUtil.getEsriExtent("full").expand(1.2);

/**
 * Adds out of extent layer
 */
export const addOutOfExtentLayer = (): void => {
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
}
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
//             });
//             outOfExtentLayer.add(g);
//         }
//     } else {
//         const g = new Graphic({
//             geometry: diffGeoms,
//             symbol: symbol,
//         });
//         outOfExtentLayer.add(g);
//     }
// }

