import {createRouter, createWebHistory} from "vue-router";
import MainView from "../views/main-view.vue";
import HomeView from "../views/home-view.vue";
import MapView from "../views/map-view.vue";
import PropertyView from "../views/property-view.vue";

const router = createRouter({
    history : createWebHistory(),
    routes: [
        {
            path : '/',
            component : MainView,
            children : [
                {
                    path : '/',
                    component : HomeView,
                },
                {
                    path : '/map',
                    component : MapView,
                },
                {
                    path : 'property/:id',
                    component : PropertyView,
                }
            ]
        }
    ]
});

export default router;