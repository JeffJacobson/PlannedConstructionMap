import LayerInfo, { LayerStatus } from "../types/LayerInfo";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Graphic from "@arcgis/core/Graphic";
import WebMap from "@arcgis/core/Map";
import { addGraphicsByType, buildGraphicsByType } from "./graphicLayerUtil";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as geomJsonUtils from "@arcgis/core/geometry/support/jsonUtils";
import Renderer from "@arcgis/core/renderers/Renderer";
import Field from "@arcgis/core/layers/support/Field";
import GroupLayerInfo from "../types/GroupLayerInfo";
import AppConfig from "../types/AppConfig";
import { fetchJson } from "../utils/miscUtil";
import { isEsriFeatures } from "../utils/typeUtil";
import Layer from "@arcgis/core/layers/Layer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { toastInjectionKey } from "vue-toastification";
import { store } from "../store";
import { query } from "vue-gtag";
/**
 *  Specify which layers belong together (i.e. should be treated as if they are one layer) 
 *  Layers in each group should have the same visibility and displayed as a single item in the table of contents
 *   - id
 *       
 *      ID for the layer group.
 *   - layers 
 *       
 *      List of layers that belong to each group.
 *       
 *      NOTE: Popup is opened for the first layer in the layers array.
 *   - layers.id
 *       
 *      Layer ID
 *   - layer.uniqueField
 *       
 *      Unique field that is from the source database. Do not use ESRI ID (i.e. OID).
 *   - layer.jsonUrl
 *       
 *      URL of JSON file. Only applicable to those layers that loads JSON at runtime.
 */
const layerGroups: GroupLayerInfo[] = [];
/**
 * Create the layer group list
 * 
 * @param config  - Application configuration to get the JSON URLs from.
 */
export const createLayerGroupInfos = (config: AppConfig): void => {
    layerGroups.push({ id: "planned-construction", layers: [{ id: "point-planned-construction-layer", uniqueField: "ESRI_OID", jsonUrl: config.plannedConstructionPoint},{id: "line-planned-construction-layer",uniqueField: "ESRI_OID", jsonUrl: config.plannedConstructionLine }] });
    layerGroups.push({
        id: "traffic-flow", layers: [
            { id: "traffic-flow-layer", uniqueField: "" },
        ]
    });
    layerGroups.push({ id: "milepost", layers: [{ id: "mile-markers", uniqueField: "" }] });
};
/**
 * Gets layerGroups object for converting feature layer ID to layer group ID
 * 
 */
export const getLayerGroupInfos = () =>{
    return layerGroups
}

/**
 * 
 * @param layerID id of the layer
 */
export const getUniqueIdName = (layerID:string) =>{
    let uniqueID = '';
    layerGroups.forEach((group)=>{
        const targetID= group.layers.filter((layer)=>{
            return layer.id==layerID
        })
        if(targetID.length){
            uniqueID = targetID[0].uniqueField
        }
    })
    return uniqueID
}
/**
 * Gets group layer info for the specified group ID
 * 
 * @param groupId  - Group ID
 * @returns The group matching the Group ID.
 * @throws {@link RangeError} Thrown if {@link groupId}  - is not one of the expected values.
 */
const getGroupLayerInfo = (groupId: string): GroupLayerInfo => {
    const result = layerGroups.find((item) => item.id === groupId);
    if (!result) {
        const ids = layerGroups.map((item) => item.id);
        throw new RangeError(`${groupId} is an invalid feature type. The valid IDs are: ${ids.join(', ')}.`);
    }
    return result;
}

/**
 * Get layer IDs from the layer group ID
 * 
 * @param groupId  - ID of the layer group
 * @returns array of layer IDs
 */
export const getLayerIds = (groupId: string): string[] => {
    console.log(groupId)
    layerGroups.forEach(group=>{
        console.log(group)
    })
    const result = layerGroups.find((item) => {
        return item.id === groupId;
    });
    console.log(result)
    if (result) {
        return result.layers.map((each) => {
            return each.id;
        });
    } else {
        const ids = layerGroups.map((item) => {
            return item.id;
        });
        throw "Failed to find a layer with the ID, " + groupId + ". The valid IDs are: " + ids.join(", ") + ".";
    }
}

/**
 * Resizes a graphic
 * 
 * @param graphic  - A graphic
 */
export const resizeFeature = (graphic: Graphic): void => {
    const mapGraphic = buildGraphicsByType("CIMSymbol", graphic);
    addGraphicsByType("selectedGraphic", mapGraphic);
}
/**
 * Set the visibility of the specified layer in the layer list.
 * NOTE: The layer list need to be committed to the state store.
 *
 * @param layer  - Layer
 * @param layerInfo  - LayerInfo
 * @param visible  - visibility: true/false
 * @returns Layer status
 */
export const setLayerVisibility = async (layer: Layer, layerInfo: LayerInfo, visible: boolean): Promise<LayerStatus> => {
    let outStatus = layerInfo.status;
    if (layer.visible === visible) { return outStatus; }
    else { layer.visible = visible }
    if (visible && layerInfo.status !== LayerStatus.Loaded && layerInfo.isJson() && layerInfo.url) {
        try {
            const info = await reloadData(layerInfo.url, layer as FeatureLayer);
            outStatus = info ? info.status : layerInfo.status;
        } catch (ex) {
            outStatus = LayerStatus.Failed;
        }
    }
    return outStatus;
}
/**
 * Get a feature from the layer group.
 *
 * @param uniqueValue  - 
 * Value from the unique field specified in the layerGroups.
 * @param groupId  - 
 * ID of the layer group (type). If the specified group has more than one layer, query is done against the first layer only.
 * @param map  - ESRI map object
 * @returns Graphic or nothing
 */
export const getFeature = async (uniqueValue: number | string, groupId: string, map: WebMap): Promise<Graphic | undefined> => {
    let groupInfo;
    try{
        groupInfo=getGroupLayerInfo(groupId);
    }
    catch(e){
        console.log(e);
    }
    if(groupInfo){
        console.log(groupInfo.id)
        if(groupInfo.id=="alert"){//try each layer in alert layer group
            let roadAlertPointIndex=0;
            let ferryRoutesPointIndex=0;
            groupInfo.layers.forEach((each, index)=>{
                if(each.id=="road-alerts-layer"){
                    roadAlertPointIndex = index;
                }
                if(each.id=="ferry-routes-points-layer"){
                    ferryRoutesPointIndex = index;
                }
            });
            const roadAlertFeature = await queryFeature(groupInfo, uniqueValue, map, roadAlertPointIndex);
            console.log(roadAlertFeature)
            if(roadAlertFeature){
                return roadAlertFeature;
            }
            else{
                const ferryRouteFeature = await queryFeature(groupInfo, uniqueValue, map, ferryRoutesPointIndex);
                if(ferryRouteFeature){
                    return ferryRouteFeature;
                }
                else{
                    return undefined
                }
            }

        }
        if(groupInfo.id=="traffic-flow"){
            let linearClosureLayerIndex = 0
            groupInfo.layers.forEach((each, index)=>{
                if(each.id=="linear-closures-layer"){
                    linearClosureLayerIndex = index
                }
            });
            const ferryRouteFeature = await queryFeature(groupInfo, uniqueValue, map, linearClosureLayerIndex);
            if(ferryRouteFeature){
                return ferryRouteFeature;
            }
        }
        if(groupInfo.id=="bordercrossing"){
            const uniqueField = getUniqueIdName(groupInfo.layers[0].id)
            const bordercrossingfeatures = await queryFeaturesAll(groupInfo, map,0)
            console.log(parseInt(uniqueValue as string))
            const targetFeature = bordercrossingfeatures?.filter((feature)=>{//deal with issue where route id is given as string with leading spaces
                return parseInt(feature.attributes[uniqueField] as string)==parseInt(uniqueValue as string)
            })
            if(targetFeature){
               return(targetFeature[0])
            }
            else{
                return undefined
            }
        }
        else{
            const targetFeature = await queryFeature(groupInfo, uniqueValue, map,0);
            return targetFeature
        }
    } 
}

const queryFeaturesAll = async(groupInfo:GroupLayerInfo, map:WebMap, layerIndex:number)=>{//requires known layer index
    const layer = map.findLayerById(groupInfo.layers[layerIndex].id);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    await layer.when();
    if (layer.type !== "feature") {
        throw layer.type + " is not supported.";
    }
    const fLayer = layer as FeatureLayer;
    await fLayer.when();
    //set layer visibility to true so it shows in map, and update loaded property for layer in layerlist in store to true 
    store.dispatch("updateLayerVisibility",
        {
            ids: [
                layer.id
            ],
            visible: true
        }
    );
    const query = fLayer.createQuery();//create query object
    const ftrCount = await fLayer.queryFeatureCount();
    if (groupInfo.layers[layerIndex].jsonUrl && ftrCount === 0) {
        await reloadData(groupInfo.layers[layerIndex].jsonUrl as string, fLayer);
        query.where = '1=1';
        const result = await fLayer.queryFeatures(query);
        console.log(result)
        return result.features.length>0?result.features:undefined;
    }
    else{
        query.where = '1=1';
        const result = await fLayer.queryFeatures(query);
        console.log(result)
        return result.features.length>0?result.features:undefined;
    }
}

/**
 * 
 * @param groupInfo 
 * @param uniqueValue 
 * @param map 
 * @param layerIndex 
 * @returns 
 */
const queryFeature = async(groupInfo:GroupLayerInfo, uniqueValue: string|number, map:WebMap, layerIndex:number) =>{
    const layer = map.findLayerById(groupInfo.layers[layerIndex].id);
    // Make sure the layer is loaded. If this is done too early, query does not resolve...
    await layer.when();
    if (layer.type !== "feature") {
        throw layer.type + " is not supported.";
    }
    const fLayer = layer as FeatureLayer;
    await fLayer.when();
    store.dispatch("updateLayerVisibility",
        {
            ids: [
                layer.id
            ],
            visible: true
        }
    );//set layer visibility to true so it shows in map, and update loaded property for layer in layerlist in store to true 
    const ftrCount = await fLayer.queryFeatureCount();
    if (groupInfo.layers[layerIndex].jsonUrl && ftrCount === 0) {
        await reloadData(groupInfo.layers[layerIndex].jsonUrl as string, fLayer);
        if (groupInfo.layers.length > 0) {
            for (const eachLyr of groupInfo.layers) {
                const fLyr2 = map.findLayerById(eachLyr.id) as FeatureLayer;
                if (eachLyr.jsonUrl) {
                    store.dispatch("updateLayerVisibility",
                        {
                            ids: [
                                fLyr2.id
                            ],
                            visible: true
                        }
                    );//set layer visibility to true so it shows in map, and update loaded property for layer in layerlist in store to true 
                    await reloadData(eachLyr.jsonUrl, fLyr2);
                }
            }
        }
    }
    const query = fLayer.createQuery();
    const field = fLayer.getField(groupInfo.layers[layerIndex].uniqueField);
    query.where = `${groupInfo.layers[layerIndex].uniqueField} = `;
    if (field.type == 'string') {
        if ((uniqueValue as string).split("-").length > 0 && fLayer.title == "Mountain Pass Reports") {
            const uniqueValues = (uniqueValue as string).split("-").map((value) => {
                if (value == "to" || value == "To") {
                    return "to"
                }
                else {
                    const properCase = (value[0].toLocaleUpperCase()) + (value.substring(1).toLocaleLowerCase());
                    return (properCase);
                }
            });
            query.where += `'${(uniqueValues.join('-'))}'`;
        }
        else {
            query.where += `'${uniqueValue}'`
        }
    }
    else if (field.type == 'date') {
        query.where += `'${uniqueValue}'`
    }
    else {
        query.where += uniqueValue  
    }
    const result = await fLayer.queryFeatures(query);
    return result.features.length>0?result.features[0]:undefined;
}
/**
 * Initialize a feature layer
 * 
 * @param layerId  - Layer ID
 * @param layerTitle  - Title
 * @param renderer  - Renderer
 * @param fields  - Array of field
 * @param geometryType  - geometry type
 * @param visible  - default visibility
 * @param graphics  - (Optional) Array of graphics to load
 * @param definitionExpression  - Selection expression.
 * @returns Promise<FeatureLayer>
 */
export const initLayer = async (layerId: string, layerTitle: string,
    renderer: Renderer, fields: Field[], geometryType: "point" | "multipoint" | "polyline" | "polygon",
    visible: boolean, graphics?: Graphic[], definitionExpression?: string): Promise<FeatureLayer> => {
    // Create Graphics from JSON...
    if (!graphics) {
        graphics = [];
    }
    if (!definitionExpression) {
        definitionExpression = '1=1'
    }
    //let graphics: Graphic[] = [];
    // if (visible) {
    //     graphics = await fetchJsonData(jsonUrl);
    // }
    // Do not set the WSDOT unique ID as OID. The app might change them.
    // So create a new system generated field as OID.
    let oidField = "AppGenId";
    const foundOid = fields.find((each) => {
        return each.name === oidField;
    });
    if (foundOid) {
        oidField += 2;
    }
    fields.push(new Field({
        name: oidField,
        alias: oidField,
        type: "oid"
    }));
    const layer = new FeatureLayer({
        id: layerId,
        title: layerTitle,
        objectIdField: oidField,
        renderer: renderer,
        fields: fields,
        visible: visible,
        source: graphics,
        geometryType: geometryType,
        spatialReference: SpatialReference.WebMercator,
        definitionExpression: definitionExpression,
        copyright: undefined,
        outFields: ["*"]
    });
    return layer;
}

// Keep track of what is loading, so prevent loading the same layer at the same time.
let loadManager: { id: string, promise: Promise<LayerStatus | undefined> }[] = [];

/**
 * Reloads the data for a layer from the JSON URL.
 * 
 * @param jsonUrl  - URL of JSON data
 * @param layer  - A feature Layer
 * @returns Either a {@link LayerInfo} or undefined.
 */
export const reloadData = async (jsonUrl: string, layer: FeatureLayer | undefined): Promise<LayerInfo | undefined> => {
    if (!layer) { return; }
    const reload = async (jsonUrl: string, layer: FeatureLayer): Promise<LayerStatus | undefined> => {
        if (!layer.visible) { return; }
        let status: LayerStatus;
        // Fetch all features from JSON...
        try {
            const graphics = await fetchJsonData(jsonUrl);
            if (graphics.length > 0) {
                await replaceFeatures(layer, graphics);
            }
            status = LayerStatus.Loaded;
        } catch (ex) {
            console.error(ex);
            status = LayerStatus.Failed;
        }
        return status;
    }
    // Check if the layer is already being loaded currently or not...
    const runningProc = loadManager.find(x => x.id === layer.id);
    if (runningProc) {
        // Loading is in progress already, so wait until that finishes.
        await runningProc.promise;
    }
    // Start loading.
    const promise = reload(jsonUrl, layer);
    loadManager.push({ id: layer.id, promise: promise });
    const status = await promise;
    loadManager = loadManager.filter(x => x.id !== layer.id);
    if (status) {
        const info = new LayerInfo(layer.id);
        info.status = status;
        return info;
    }
}

/**
 * Replaces the features in a feature layer.
 * 
 * @param layer  - A feature layer
 * @param newFeatures  - The new features that will replace the current ones.
 */
export const replaceFeatures = async (layer: FeatureLayer, newFeatures: Graphic[]): Promise<void> => {
    // Delete existing features...
    const fs = await layer.queryFeatures();
    await layer.applyEdits({ deleteFeatures: fs.features });
    // Load features...
    await layer.applyEdits({ addFeatures: newFeatures });
    layer.refresh();
}

/**
 * Fetches JSON data and converts them to graphics.
 * 
 * @param jsonUrl  - URL for a JSON file
 * @returns An array of {@link Graphic} objects.
 * @throws {@link TypeError} Thrown if the JSON is not in Esri features format.
 */
export const fetchJsonData = async (jsonUrl: string): Promise<Graphic[]> => {
    // Fetch all features from JSON...
    const json = await fetchJson(jsonUrl);
    if (!isEsriFeatures(json)) {
        throw new TypeError("Invalid JSON format. It is not ESRI Features JSON.");
    }
    const sr = SpatialReference.fromJSON(json.spatialReference);
    // Create graphic out of each feature...
    const graphics: Graphic[] = [];
    for (const each of json.features) {
        const geom = geomJsonUtils.fromJSON(each.geometry);
        if (!geom) {
            console.warn("Failed to get geometry. " + JSON.stringify(each));
        } else {
            geom.spatialReference = sr;
            graphics.push(new Graphic({
                geometry: geom,
                attributes: each.attributes,
            }));
        }
    }
    return graphics;
}