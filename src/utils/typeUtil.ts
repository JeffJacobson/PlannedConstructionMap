/**
 * Represents rows returned from an Esri query.
 */
export type EsriRows = {
    features: { attributes: Record<string, unknown> }[]
}

/**
 * Represents results of a feature layer query.
 */
export type EsriFeatures = {
    spatialReference: { wkid: number, latestWkid: number },
    features: {
        attributes: Record<string, unknown>,
        geometry: unknown
    }[]
}

/**
 * Determines if an object is an {@link EsriRows}.
 * - Contains "features" property.
 * - "features" is an array
 * - Every item in "features" has an "attributes" property.
 * 
 * @param obj  - An object to be tested.
 * @returns True if object is {@link EsriRows}, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEsriRows = (obj: any): obj is EsriRows => {
    return "features" in obj && Array.isArray(obj.features)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        && obj.features.every((x: any) => { return "attributes" in x });
}

/**
 * Determines if an object represents Esri formatted features by checking the following
 * - Contains a "features" property which is an array.
 * - Contains a "spatialReference" property
 * - Each object in "features" contains:
 *      - "attributes"
 *      - "geometry"
 * 
 * @param obj  - An object to be tested.
 * @returns Returns true if it the object is an {@link EsriFeatures} object, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEsriFeatures = (obj: any): obj is EsriFeatures => {
    return "features" in obj && "spatialReference" in obj
        && Array.isArray(obj.features)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        && obj.features.every((x: any) => {
            return "attributes" in x && "geometry" in x
        });
}