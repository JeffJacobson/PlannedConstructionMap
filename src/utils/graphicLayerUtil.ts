/**
 * A set of functions to deal with the display of graphics that aren't intended to persist in the map.
 */

import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import type Map from "@arcgis/core/Map";
import type SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import type UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import { mapView } from "../esri-stuff/esriMap";
import { MyLocationSymbol } from "../symbols/MyLocationSymbol";

/**
 * Creates a graphic of the specified type.
 * @param type  - The type of data being passed: "coordinates" or "CIMSymbol"
 * @param data  - The data object
 * @returns A graphic
 * @throws {TypeError} Thrown if data is not one of the expected types.
 */
export function buildGraphicsByType(type: "coordinates", data: __esri.PointProperties): Graphic;
export function buildGraphicsByType(type: "CIMSymbol", data: Graphic): Graphic;
export function buildGraphicsByType(
  type: "coordinates" | "CIMSymbol",
  data: __esri.PointProperties | Graphic
): Graphic {
  function isPointProperties(inputData: typeof data): inputData is __esri.PointProperties {
    if (Object.prototype.hasOwnProperty.call(data, "x")) {
      return true;
    }
    return false;
  }

  function isGraphic(inputData: typeof data): inputData is Graphic {
    for (const name of ["layer", "attributes", "geometry"]) {
      if (!Object.prototype.hasOwnProperty.call(data, name)) {
        return false;
      }
    }
    return true;
  }

  if (type === "coordinates" && isPointProperties(data)) {
    const graphic = new Graphic({
      geometry: new Point({
        longitude: data.longitude,
        latitude: data.latitude,
      }),
      symbol: MyLocationSymbol,
    });
    return graphic;
  }
  if (type === "CIMSymbol" && isGraphic(data)) {
    const layer = data.layer as FeatureLayer;
    let selectedSymbol = new CIMSymbol();
    if (layer.renderer.type == "unique-value") {
      const renderer = layer.renderer as UniqueValueRenderer;
      const field = renderer.field;
      renderer.uniqueValueInfos.forEach((uniqueValueInfo) => {
        if (uniqueValueInfo.value == data.attributes[field]) {
          selectedSymbol = uniqueValueInfo.symbol as CIMSymbol;
        }
      });
    }
    if (layer.renderer.type == "simple") {
      const renderer = layer.renderer as SimpleRenderer;
      selectedSymbol = renderer.symbol as CIMSymbol;
    }
    const jsonSymbol = selectedSymbol.toJSON();
    jsonSymbol.symbol.symbolLayers[0].size = 30;
    jsonSymbol.symbol.symbolLayers[0].offsetY = 15;
    const newSymbol = CIMSymbol.fromJSON(jsonSymbol);

    const graphic = new Graphic({
      geometry: data.geometry,
      symbol: newSymbol,
    });
    return graphic;
  }
  throw new TypeError("Unsupported type");
}

/**
 * Assigns a graphicType attribute to a {@link Graphic} and adds it to the {@link MapView}
 * @param graphicType - A string indicating the graphic type.
 * @param graphic - A graphic
 */
export const addGraphicsByType = (graphicType: string, graphic: Graphic): void => {
  graphic.attributes = { graphicType };
  mapView.graphics.add(graphic as Graphic);
};

export const displayPointInteractionGraphics = (
  layerId: string,
  map: Map,
  targetField: string,
  targetValue: string | number | undefined
): void => {
  const layer = map.findLayerById(layerId);
  if (!layer || layer.type != "feature") {
    console.warn(`The specified layer, ${layerId}, is not available or not a feature layer.`);
    return;
  }
  const fLyr = layer as FeatureLayer;
  fLyr.visible = true;
  fLyr.definitionExpression = parseInt(targetValue as string)?`${targetField} in (${targetValue})`:`${targetField} in ('${targetValue}')`;
  fLyr.refresh();
};

export const hidePointInteractionGraphics = (layerId: string, map: Map): void => {
  const layer = map.findLayerById(layerId);
  if (!layer || layer.type != "feature") {
    console.warn(`The specified layer, ${layerId}, is not available or not a feature layer.`);
    return;
  }
  const targetLayer = layer as FeatureLayer;
  targetLayer.visible = false;
  if (targetLayer) {
    targetLayer.definitionExpression = "1=0"; //remove line restriction symbol
  }
};

export const removeGraphicsByType = (graphicType: string): void => {
  switch (graphicType) {
    default: {
      const collection = mapView.graphics;
      const graphicsArray = collection.toArray();
      for (let i = 0; i < graphicsArray.length; i++) {
        if (graphicsArray[i].attributes.graphicType == graphicType) {
          mapView.graphics.remove(graphicsArray[i]);
        }
      }
    }
  }
};
