// import Graphic from "@arcgis/core/Graphic";
// import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
//import RowInfo from "./RowInfo";


interface FeatureInfo {
    layerId: string;
    id: number; // Object ID. Can be used as v-for key.
    /**
     * If simply specify "Object" for the type of the attributes property, get the error when try to get the value dynamically. 
     * Error: "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'.
     * No index signature with a parameter of type 'string' was found on type 'Object'."
     */
    attributes: { [key: string]: string | number | undefined };
    /** Attributes from the related table. */
    //relatedInfos?: RowInfo[];
    mapPoint: { x: number; y: number };
}

export default FeatureInfo;



