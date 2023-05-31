import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
const lineAlertSymbol = new SimpleLineSymbol({
    style: "solid",
    color: 'rgba(255, 193, 7, .7)',
    width: "15px",
    cap:"square"
    
});
const lineAlertSymbolLow = new SimpleLineSymbol({
    style: "solid",
    color: "rgba(255, 193, 7, .7)",
    width: "15px",
    cap:"square"
    
});
const lineAlertSymbolMedium = new SimpleLineSymbol({
    style: "solid",
    color: "rgba(255, 106, 19, .7)",
    width: "15px",
    cap:"square"
    
});
const lineAlertSymbolHigh = new SimpleLineSymbol({
    style: "solid",
    color: "rgba(179, 11, 0, .7)",
    width: "15px",
    cap:"square"
    
});
export {lineAlertSymbol, lineAlertSymbolLow, lineAlertSymbolMedium, lineAlertSymbolHigh}