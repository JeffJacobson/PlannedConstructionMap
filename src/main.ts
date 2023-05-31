//#region import css
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css" // WATECH CSS
// import "./assets/sidr.css" // WATECH CSS // cspell:disable-line
//#endregion
//#region import vue stuff
import router from './router';
import App from './App.vue'
import { createApp } from 'vue'
import VueClickAway from "vue3-click-away";
import { store, key } from "./store";
//#endregion
//#region import third party packages
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
//#endregion
//#region import utils
//import {detectGoOrange} from './utils/themeUtil'
import { loadConfig } from "./utils/appConfigUtil";
import { createLayerGroupInfos } from "./utils/layerUtil";
import VueGtag from "vue-gtag";
//#endregion
// Load config before app starts...
loadConfig().then((appConfig) => {
    //#region set theme and relevant colors
    /*detectGoOrange().then((goOrangeResponse)=>{//apply go orange theme
        if(goOrangeResponse){
            document.documentElement.style.setProperty('--color-primaryBrand100', '#FF6A13');
            document.documentElement.style.setProperty('--color-primaryBrand80', '#FF8842');
            document.documentElement.style.setProperty('--color-footerBackground', '#FF8F4E');
            document.documentElement.style.setProperty('--color-themeText', '#1d252dE');
            store.commit("setTheme","Go Orange");
        }
    });*/
    //#endregion
    //#region track app using MS Application Insights
    const appInsights = new ApplicationInsights(
        {
            config: {
                instrumentationKey: '3f639dd2-45dd-4de8-afc2-3e6bc599e381',
                enableAutoRouteTracking: true,
                enableUnhandledPromiseRejectionTracking: true,
                autoTrackPageVisitTime: true,
                excludeRequestFromAutoTrackingPatterns: ['googlesyndication', 'doubleclick', 'google-analytics']
            }
        });
    appInsights.loadAppInsights();
    appInsights.trackPageView();
    //#endregion
    createLayerGroupInfos(appConfig);
    // adding store as a plugin while creating an app...
    const app = createApp(App);
    app.use(store, key);
    app.use(router);
    app.use(VueClickAway);
    app.use(Toast, {
        // You can set your default options here
        position: POSITION.BOTTOM_CENTER,
        canTimeout:false,
        //timeout: 5000,
        maxToasts: 5,
        draggable: false,
        hideProgressBar: true,
        
    });
    app.use(VueGtag, {
        config: {
          id: "G-RBQE8K3PSW"
        }
    });
    app.mount('#app');
    app.provide('$appInsights', appInsights);
});
