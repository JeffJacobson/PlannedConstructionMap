import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

let layer: MapImageLayer | undefined;
export const layerId = "traffic-flow-layer";
const layerTitle = "Live Traffic Flow";

/**
 * Initializes the Traffic Layer
 * 
 * @param url  - @see  {@link __esri.MapImageLayerProperties.url}
 * @param refreshMinute  - Refresh interval in minutes. @see {@link  __esri.RefreshableLayerProperties.refreshInterval}
 * @returns Returns Traffic {@link LayerInfo}
 */
export const initLayer = (url: string, refreshMinute: number): LayerInfo => {
    const layerInfo = new LayerInfo(layerId, layerTitle, url);
    try {
        layer = new MapImageLayer({
            id: layerId,
            url: url,
            sublayers: [
                { id: 6, visible: true, title: "Live Traffic Flow" }, // live traffic
                // { id: 2, visible: false }, // incidents overview: critical and major incidents
                // { id: 4, visible: true }, // incidents detail: critical, major, minor as well as low impact incidents
            ],
            visible:false,
            refreshInterval: refreshMinute,
        });
    } catch (ex) {
        console.error(ex);
        layer = undefined;
        layerInfo.status = LayerStatus.Failed
    }
    return layerInfo;
}


/**
 * Gets the Traffic MapImageLayer
 * 
 * @returns Returns the Traffic layer if it has been initialized, undefined otherwise.
 */
const getLayer = (): MapImageLayer | undefined => {
    if (!layer) {
        console.error("TrafficLayer is not ready yet!");
    }
    return layer;
}

export default getLayer