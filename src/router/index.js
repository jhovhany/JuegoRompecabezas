import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PuzzleView from '../views/PuzzleView.vue'
import CongratsView from '../views/CongratsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/juego', name: 'juego', component: PuzzleView },
    { path: '/felicidades', name: 'felicidades', component: CongratsView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
