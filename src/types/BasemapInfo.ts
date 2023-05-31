import Basemap from "@arcgis/core/Basemap";

interface BasemapInfo {
    name: string;
    basemap: Basemap | undefined;
}

export default BasemapInfo;