import AppConfig from "../types/AppConfig"

let appConfig: AppConfig | undefined;


/**
 *
 */
export const loadConfig = async (): Promise<AppConfig> => {
    if (!appConfig) {
        //include path where application was loaded from.  QA/Prod will be different than local dev.
        const href = window.location.pathname;
        const rootPath = "/travel/real-time/map";
        const idx = href.toLowerCase().lastIndexOf(rootPath);
        let dir = "";
        if (idx >= 0) {
            dir = href.substring(0, idx + rootPath.length);
        }
        const fetchResponse = await fetch(dir + "/appconfig.json");
        //const fetchResponse = await fetch(dir + "/appConfig.json");
        const config = await fetchResponse.json();
        appConfig = config as AppConfig;
    }
    return appConfig;

}


/**
 *
 */
export const getConfig = (): AppConfig => {
    if (!appConfig) {
        throw "App.config is not loaded yet.";
    }
    return appConfig;
}
