import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;
export const layerId = "roads-reference-layer";
const layerTitle = "ESRI Roads Reference"



export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new MapImageLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            visible: false,
        });
    }
    catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed;
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): MapImageLayer | undefined => {
    if (!layer) {
        console.error("ESRI Roads Reference is not ready yet!");
    }
    return layer;
}

export default getLayer