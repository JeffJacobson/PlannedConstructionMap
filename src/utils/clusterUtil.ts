import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";
import Graphic from "@arcgis/core/Graphic";
// import Layer from "@arcgis/core/layers/Layer";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Point from "@arcgis/core/geometry/Point";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { getUniqueIdName } from "./layerUtil";

export const clusterMaxScale = 19000;
const defaultRadius = 60;

const labelColor = "#005151";

const clusterConfigAlert = new FeatureReductionCluster({
    clusterRadius: 2,
    clusterMinSize: 20,
    clusterMaxSize: 36,
});

export {clusterConfigAlert }

/**  
Returns IDs of each feature if one of the following conditions is met:
- maxCount is not set 
- The number of features is less than the maxCount.
- All the features are at the identical location.
Otherwise returns extent of all features.
 *
 * @param clusterGraphic - 
 * @param layer - 
 * @param mapView - 
 * @param maxCount - 
 */
export const getIdsFromCluster = async (clusterGraphic: Graphic, layer: FeatureLayer, mapView: MapView, maxCount?: number): Promise<number[] | Extent> => {
    const layerView = await mapView.whenLayerView(layer);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    const uid = getUniqueIdName(clusterGraphic.layer.id)
    query.aggregateIds = [clusterGraphic.attributes[uid]];
    query.outFields = [layer.objectIdField];
    const result = await layerView.queryFeatures(query);
    // let doReturnId = false;
    let extent: Extent | undefined;
    if (maxCount && result.features.length > maxCount) {
        // let identical = true;
        const pt0 = result.features[0].geometry as Point;
        // Find out extent of all features...
        let minX = pt0.x;
        let maxX = pt0.x;
        let minY = pt0.y;
        let maxY = pt0.y;
        for (let i = 1; i < result.features.length; i++) {
            const pt1 = result.features[i].geometry as Point;
            if (pt1.x < minX) {
                minX = pt1.x;
            } else if (pt1.x > maxX) {
                maxX = pt1.x;
            }
            if (pt1.y < minY) {
                minY = pt1.y;
            } else if (pt1.y > maxY) {
                maxY = pt1.y;
            }
        }
        if (minX !== maxX || minY !== maxY) {
            extent = new Extent({
                xmin: minX,
                xmax: maxX,
                ymin: minY,
                ymax: maxY,
                spatialReference: pt0.spatialReference
            });
        }
    }
    if (!extent) {
        const ids = result.features.map((feature) => { return feature.attributes[layer.objectIdField]; });
        return ids;
    } else {
        return extent;
    }
}

/**
 * @param clusterGraphic - 
 * @param layer - 
 * @param mapView - 
 */
export const getClusterExtent = async (clusterGraphic: Graphic, layer: FeatureLayer, mapView: MapView): Promise<Extent> => {
    const layerView = await mapView.whenLayerView(layer);
    const query = layerView.createQuery();
    // Object ID of the cluster...
    query.aggregateIds = [clusterGraphic.getObjectId()];
    const result = await layerView.queryFeatures(query);
    const pt0 = result.features[0].geometry as Point;
    // Find out extent of all features...
    let minX = pt0.x;
    let maxX = pt0.x;
    let minY = pt0.y;
    let maxY = pt0.y;
    for (let i = 1; i < result.features.length; i++) {
        const pt1 = result.features[i].geometry as Point;
        if (pt1.x < minX) {
            minX = pt1.x;
        } else if (pt1.x > maxX) {
            maxX = pt1.x;
        }
        if (pt1.y < minY) {
            minY = pt1.y;
        } else if (pt1.y > maxY) {
            maxY = pt1.y;
        }
    }
    if (minX === maxX) {
        minX -= 1;
        maxX += 1;
    }
    if (minY === maxY) {
        minY -= 1;
        maxY += 1;
    }
    const extent = new Extent({
        xmin: minX,
        xmax: maxX,
        ymin: minY,
        ymax: maxY,
        spatialReference: pt0.spatialReference
    });
    return extent;
}





