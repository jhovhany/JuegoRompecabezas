import { createRouter, createWebHistory } from 'vue-router'
import PuzzleView from '../views/PuzzleView.vue'
import CongratsView from '../views/CongratsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'juego', component: PuzzleView },
    { path: '/juego', redirect: '/' },
    { path: '/felicidades', name: 'felicidades', component: CongratsView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
