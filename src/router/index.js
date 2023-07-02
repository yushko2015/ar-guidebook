import { createRouter, createWebHistory } from 'vue-router'
import NavigationScreen from "../components/NavigationScreen.vue"
import MapPage from "../components/MapPage.vue"
import LocationsList from "../components/LocationsList.vue"

const routes = [
  {
    path: '/',
    name: 'NavigationScreen',
    component: NavigationScreen
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationsList
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router