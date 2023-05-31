import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

let layer: VectorTileLayer | undefined;
export const layerId = "mile-markers";
const layerTitle = "Mile Markers";

/**
 * Initialize the layer
 * 
 * @param url - 
 * @returns LayerInfo
 */
export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new VectorTileLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            visible: false
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): VectorTileLayer | undefined => {
    if (!layer) {
        console.error("MileMarkers is not ready yet!");
    }
    return layer;
}

export default getLayer