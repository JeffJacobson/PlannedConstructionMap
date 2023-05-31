/**
 * Manages custom URLs for the application.
 * @see {@link https://router.vuejs.org/}
 *
 * @packageDocumentation
 */
import { createRouter, createWebHistory } from 'vue-router';
import EsriMapView from '../components/EsriMapView.vue';
import * as urlParamUtil from '../utils/urlParamUtil';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: EsriMapView
    },
    {
        path: '/layer/:layername',
        name: 'Layer',
        component: EsriMapView,
        beforeEnter: (to) => {
            const p = to.params.layername;
            const name = typeof p === 'string' ? p : p[0];
            if (!urlParamUtil.validateLayerName(name)) {
                console.error("Invalid layer was specified: " + name + ". Redirecting to the default page.");
                return '/';
            }
        }
    },
    {
        path: '/feature/:featuretype/:featureid',
        name: 'Feature',
        component: EsriMapView,
        beforeEnter: (to) => {
            const p = to.params.featuretype;
            const name = typeof p === 'string' ? p : p[0];
            if (!urlParamUtil.validateLayerName(name)) {
                console.error("Invalid feature type was specified: " + name + ". Redirecting to the default page.");
                return '/';
            }
        }
    },
    {
        path: '/area/:areaname',
        name: 'Area',
        component: EsriMapView,
        beforeEnter: (to) => {
            const p = to.params.areaname;
            const name = typeof p === 'string' ? p : p[0];
            if (!urlParamUtil.validateAreaName(name)) {
                console.error("Invalid area was specified: " + name + ". Redirecting to the default page.");
                return '/';
            }
        }
    },
    // Redirect invalid routes to home...
    { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map