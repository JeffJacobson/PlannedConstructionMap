import { lineAlertSymbolLow, lineAlertSymbolMedium, lineAlertSymbolHigh} from "../symbols/LinePlannedConstructionSymbol"
import Field from "@arcgis/core/layers/support/Field";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as layerUtil from "../utils/layerUtil";
import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import Graphic from "@arcgis/core/Graphic";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
const renderer = new UniqueValueRenderer({
    field:"TravelCenterPriorityId",
    uniqueValueInfos: [
        {
            label: "HIGH IMPACT",
            value: 2,
            symbol: lineAlertSymbolHigh
        },
        {
            label: "MODERATE IMPACT",
            value: 3,
            symbol: lineAlertSymbolMedium
        },
        {
            label: "LOW IMPACT",
            value: 4,
            symbol: lineAlertSymbolLow
        },
    ]
});

const fields = [
    new Field({ name: "RegionId", type: "small-integer", alias: "RegionId" }),
    new Field({ name: "Title", type: "string", alias: "Title", length: 100 }),
    new Field({ name: "StateRouteId", type: "string", alias: "StateRouteId", length: 11 }),
    new Field({ name: "StateRouteName", type: "string", alias: "StateRouteName", length: 25 }),
    //new Field({ name: "Location", type: esriFieldTypeGeometry, alias: Location }),
    new Field({ name: "StartSRMP", type: "single", alias: "StartSRMP" }),
    new Field({ name: "EndSRMP",  type: "single", alias: "EndSRMP" }),
    new Field({ name: "StartWorkDateTime", type: "date", alias: "StartWorkDateTime", length: 8 }),
    new Field({ name: "EndWorkDateTime", type: "date", alias: "EndWorkDateTime", length: 8 }),
    new Field({ name: "WorkStartTime", type: "date", alias: "WorkStartTime", length: 8 }),
    new Field({ name: "WorkEndTime", type: "date", alias: "WorkEndTime", length: 8 }),
    new Field({ name: "RoadDirection", type: "string", alias: "RoadDirection", length: 20 }),
    new Field({ name: "WorkDescription", type: "string", alias: "WorkDescription", length: 1073741822 }),
    new Field({ name: "TrafficImpact", type: "string", alias: "TrafficImpact", length: 1073741822 }),
    new Field({ name: "Landmark", type: "string", alias: "Landmark", length: 100 }),
    new Field({ name: "LaneClosures", type: "string", alias: "LaneClosures", length: 250 }),
    new Field({ name: "MondayWorkFlag", type: "small-integer", alias: "MondayWorkFlag" }),
    new Field({ name: "TuesdayWorkFlag", type: "small-integer", alias: "TuesdayWorkFlag" }),
    new Field({ name: "WednesdayWorkFlag", type: "small-integer", alias: "WednesdayWorkFlag" }),
    new Field({ name: "ThursdayWorkFlag", type: "small-integer", alias: "ThursdayWorkFlag" }),
    new Field({ name: "FridayWorkFlag", type: "small-integer", alias: "FridayWorkFlag" }),
    new Field({ name: "SaturdayWorkFlag", type: "small-integer", alias: "SaturdayWorkFlag" }),
    new Field({ name: "SundayWorkFlag", type: "small-integer", alias: "SundayWorkFlag" }),
    new Field({ name: "LastUpdated", type: "date", alias: "LastUpdated", length: 8 }),
    new Field({ name: "ESRI_OID", type: "oid", alias: "ESRI_OID"})
]

let layer: FeatureLayer | undefined;
export const layerId = "line-planned-construction-layer";
const layerTitle = "Planned Construction Lines";


 /**
  *
  * @param jsonUrl - 
  */
 export const initLayer = async (jsonUrl: string): Promise<LayerInfo> => {
    const layerInfo = new LayerInfo(layerId, layerTitle, jsonUrl);
    let graphics: Graphic[];

    try {
        graphics = await layerUtil.fetchJsonData(jsonUrl);
        layerInfo.status = LayerStatus.Loaded;
    } catch (ex) {
        console.error(ex);
        graphics = [];
        layerInfo.status = LayerStatus.Failed;
    }

    try {
       // layer = await layerUtil.initLayer(jsonUrl, layerId, layerTitle, renderer, fields, "polyline", true, graphics,"EventCategoryDescription not in ('Closure')");
       layer = await layerUtil.initLayer(layerId, layerTitle, renderer, fields, "polyline", false, graphics,"1=0");
        layer.orderBy = [{
            field: "TravelCenterPriorityId",
            order: "ascending"
        }]
    }
    catch (ex) {
        console.error(ex);
        layerInfo.status = LayerStatus.Failed;
    }
    return layerInfo;
}


/**
 *
 */
const getLayer = (): FeatureLayer | undefined => {
    if (!layer) {
        console.error("LinePlannedConstructionLayer is not ready yet!");
    }
    return layer;
}

export default getLayer
