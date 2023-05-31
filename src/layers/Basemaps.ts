import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
import BasemapInfo from "../types/BasemapInfo";


/**
 *
 */
export const getDefaultBasemapInfo = (): BasemapInfo => { return basemaps[0] }
// Array of basemaps. The first one is the default.
const basemaps: BasemapInfo[] = [];



export const initBasemap = async (basemapUrl: string): Promise<void> => {
    const wsdotBase = new Basemap({
        baseLayers: [
            new TileLayer({
                url: basemapUrl,
                fullExtent: {
                    xmin: -1.3891559256092608E7,
                    ymin: 5706937.852318868,
                    xmax: -1.3014361668641614E7,
                    ymax: 6283349.610269983
                },
            })
        ],
        title: "WSDOT Basemap",
        id: "wsdot-basemap",
    });
    console.log(wsdotBase);
    basemaps.push({
        name: "wsdot",
        basemap: wsdotBase
    });
    // Satellite...
    const imgBase = Basemap.fromId("satellite");
    basemaps.push({
        name: "satellite",
        basemap: imgBase
    });
}



export const getBasemapInfo = (name: string): BasemapInfo => {
    const result = basemaps.find((x) => {
        return x.name === name;
    });
    if (result) {
        return result;
    } else {
        return getDefaultBasemapInfo();
    }
}
// Select the next basemap info in the array.


export const toggleBasemapInfo = (currentName: string): BasemapInfo => {
    console.log(basemaps)
    let idx = -1;
    for (let i = 0; i < basemaps.length; i++) {
        if (basemaps[i].name == currentName) {
            idx = i;
            break;
        }
    }

    if (idx >= -1 && idx < basemaps.length - 1) {
        return basemaps[idx + 1];
    }
    else {
        return basemaps[0];
    }
}
/**
 * Make sure the base map name is valid...
 *
 * @param name  - 
 */
export const validateBasemapName = (name: string): boolean => {
    const result = basemaps.filter((item) => {
        return item.name === name;
    });
    return result.length > 0;
}

