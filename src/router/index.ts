/**
 * Manages custom URLs for the application.
 * "return '/'" in beforeenter method removes route from url in browser
 * @see {@link https://router.vuejs.org/}
 * 
 * @packageDocumentation
 */
import { createRouter, createWebHistory, RouteRecordRaw,RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import EsriMapView from '../components/EsriMapView.vue'
//import * as urlParamUtil from '../utils/urlParamUtil';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: EsriMapView
  },
  {
    path: '/',
    name: 'pathMismatch',
    component: EsriMapView
  },
  {
    path: '/layers/:layername',
    name: 'Layer',
    component: EsriMapView,
    beforeEnter: (to) => {
      const p = to.params.layername;
      const layersArray = (p as string).split(",")
      console.log(layersArray)
      if(!(layersArray.length>0)){
        console.error("Invalid layer was specified: " + name + ". Redirecting to the default page.");
      }
    }
  },
  {
    path: '/featuretype/:featuretype/:featureid', // cspell: disable-line
    name: 'Feature',
    component: EsriMapView,
    beforeEnter: (to) => {
      const p = to.params.featuretype;
      const name = typeof p === 'string' ? p : p[0];
      /*if (!urlParamUtil.validateLayerName(name)) {
        console.error("Invalid feature type was specified: " + name + ". Redirecting to the default page.");
      }*/
    }
  },
  {
    path: '/namedextent/:namedextent',
    name: 'Area',
    component: EsriMapView,
    beforeEnter: (to) => {
      const p = to.params.namedextent;
      const name = typeof p === 'string' ? p : p[0];
      /*if (!urlParamUtil.validateAreaName(name)) {
        console.error("Invalid area was specified: " + name + ". Redirecting to the default page.");
      }*/
    }
  },
  {
    path: '/extent/:extent',
    name: 'Extent',
    component: EsriMapView,
    beforeEnter: (to) => {
      const p = to.params.extent;
      const name = typeof p === 'string' ? p : p[0];
      /*if (!urlParamUtil.validateExtent(name)) {
        console.error("Invalid area was specified: " + name + ". Redirecting to the default page.");
      }*/
    }
  },
  {
    path: '/base/:basename',
    name: 'Base',
    component: EsriMapView,
    beforeEnter: (to) => {
      const p = to.params.basename;
      const name = typeof p === 'string' ? p : p[0];
      if (!['satellite','wsdot'].includes(name)) {
        console.error("Invalid base map specified: " + name + ". Redirecting to the default page.");
      }
    }
  },
  // Redirect invalid routes to home...
  { path: '/:pathMatch(.*)*',
  redirect: { name: 'pathMismatch' } }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router