interface GroupLayerInfo {
    id: string;
    layers: {
        id: string;
        uniqueField: string;
        jsonUrl?: string;
    }[];
}

export default GroupLayerInfo;
