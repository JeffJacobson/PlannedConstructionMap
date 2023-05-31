import Extent from "@arcgis/core/geometry/Extent";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import ExtentInfo, { ExtentDirections } from "../types/ExtentInfo";
import XY from "../types/XY";
import { WebMercator } from "./miscUtil";

const defaultExtents: ExtentInfo[] = [
    {
        id: "full",
        title: "Full extent",
        xmin: -13899444.6466,
        xmax: -13014945.794,
        ymin: 5667345.69, // Includes Wilsonville, OR - The southern most camera & travel time are located around there.
        ymax: 6329128.62 // Includes Vancouver, BC
    },
    { // WA state extent
        id: "wa",
        title: "Washington state extent",
        xmin: -13899444.6466, ymin: 5707531.072999999,
        xmax: -13014945.794, ymax: 6275274.968499999
    },
];

/**
 * Gets extent info matching given id.
 * 
 * @param id  - One of the ids from {@link defaultExtents}.
 * @returns Extent info
 */
export const getExtentInfo = (id: string): ExtentInfo => {
    const result = defaultExtents.filter(x => x.id == id);
    return result[0];
};

/**
 * Gets an extent by name.
 * 
 * @param name  - name of extent
 * @returns an extent.
 */
export const getEsriExtent = (name: string): Extent => {
    const info = getExtentInfo(name);
    return convert2EsriExtent(info);
};

/**
 * Converts an {@link ExtentInfo} to an {@link Extent}.
 * 
 * @param extentInfo  - extent info
 * @returns Esri Extent.
 */
export const convert2EsriExtent = (extentInfo: ExtentInfo): Extent => {
    const extent = new Extent({
        xmin: extentInfo.xmin,
        xmax: extentInfo.xmax,
        ymin: extentInfo.ymin,
        ymax: extentInfo.ymax,
        spatialReference: SpatialReference.WebMercator
    });
    return extent;
};

/**
 * Converts an {@link Extent} to an {@link ExtentInfo}
 * 
 * @param extent  - An {@link Extent}
 * @returns an {@link ExtentInfo}
 */
export const convert2ExtentInfo = (extent: Extent): ExtentInfo => {
    const info: ExtentInfo = {
        xmin: extent.xmin,
        xmax: extent.xmax,
        ymin: extent.ymin,
        ymax: extent.ymax
    }
    return info;
};
/**
 * Figure out the relative direction from the full extent.
 *
 * @param mapXY  - 
 * Location to compare against the full extent.
 * @param extent  - An extent. If omitted, "full" extent is assumed.
 * @returns A two character string that matches /[ins][iwe]/
 * First char: vertical direction = i/n/s (inside/north/south);
 * Second char: horizontal direction = i/w/e (inside/west/east);
 */
export const getOutOfBoundDirection = (mapXY: XY, extent?: ExtentInfo | Extent): ExtentDirections => {
    if (!extent) {
        extent = getExtentInfo("full");
    }
    let dir = "i"; // Inside
    // Check vertical...
    if (mapXY.y > extent.ymax) {
        dir = "n";
    } else if (mapXY.y < extent.ymin) {
        dir = "s";
    }
    // Check horizontal...
    // Note: the values are negative...
    if (mapXY.x < extent.xmin) {
        dir += "w";
    } else if (mapXY.x > extent.xmax) {
        dir += "e";
    } else {
        dir += "i";
    }
    return dir as ExtentDirections;
}

/**
 * Get out of extent polygons
 * 
 * @returns an array of extents.
 */
export const getOutOfExtentPolygons = (): Extent[] => {
    const displayExtent = getEsriExtent("full").expand(1.2);
    const xMin = -20000000;
    const xMax = -1000000;
    const yMin = 0;
    const yMax = 20000000;
    const extentW = new Extent({
        xmin: xMin,
        xmax: displayExtent.xmin,
        ymin: yMin,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentN = new Extent({
        xmin: displayExtent.xmin,
        xmax: displayExtent.xmax,
        ymin: displayExtent.ymax,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentE = new Extent({
        xmin: displayExtent.xmax,
        xmax: xMax,
        ymin: yMin,
        ymax: yMax,
        spatialReference: WebMercator
    });
    const extentS = new Extent({
        xmin: displayExtent.xmin,
        xmax: displayExtent.xmax,
        ymin: yMin,
        ymax: displayExtent.ymin,
        spatialReference: WebMercator
    });
    return [extentW, extentN, extentE, extentS];
}
