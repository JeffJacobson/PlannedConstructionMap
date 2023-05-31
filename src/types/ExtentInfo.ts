export type VerticalDirection = "i" | "n" | "s";
export type HorizontalDirection = "i" | "w" | "e";

/**
 * A string representing extent directions.
 */
export type ExtentDirections = `${VerticalDirection}${HorizontalDirection}`;



/**
 * Provides information about an extent.
 */
export default interface ExtentInfo {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    title?: string;
    id?: string;
}
