import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import TileLayer from "@arcgis/core/layers/TileLayer";
let layer: TileLayer | undefined;
export const layerId = "ferry-routes-reference-layer";
const layerTitle = "Ferry Routes Reference";



export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new TileLayer({
            id: layerId,
            url: url,
            title: layerTitle,
            visible: false,
            copyright: undefined
        });
    } catch (ex) {
        console.error(ex);
        layerInfo.status = LayerStatus.Failed;
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): TileLayer | undefined => {
    if (!layer) {
        console.error("Ferry Routes Reference is not ready yet!");
    }
    return layer;
}

export default getLayer