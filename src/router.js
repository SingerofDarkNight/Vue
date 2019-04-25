import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Manage from './views/Manage'
import AddGame from './views/AddGame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/admin',
      redirect: '/admin/manage'
    },
    {
      path: '/admin/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/admin/add',
      name: 'add-game',
      component: AddGame
    }
  ]
})
