import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import TileLayer from "@arcgis/core/layers/TileLayer";

let layer: TileLayer | undefined;
export const layerId = "state-route-shields-layer";
const layerTitle = "State Route Shields";



export const initLayer = (url: string): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new TileLayer({
            id: layerId,
            url: url,
            title: "State Route Shields",
            visible: true,
            copyright: undefined,
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
const getLayer = (): TileLayer | undefined => {
    if (!layer) {
        console.error("State Route Shields is not ready yet!");
    }
    return layer;
}

export default getLayer