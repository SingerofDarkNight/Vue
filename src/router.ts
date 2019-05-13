import Vue from 'vue'
import Router from 'vue-router'
import BetHomePage from './betting/BetHomePage.vue'
import About from './views/About.vue'
import ManagePage from './admin/ManagePage.vue'
import CreatePage from './admin/CreatePage.vue'
import StatPage from './betting/stat/StatPage.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: BetHomePage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/stat',
      name: 'stat',
      component: StatPage
    },
    {
      path: '/admin',
      redirect: '/admin/manage'
    },
    {
      path: '/admin/manage',
      name: 'manage',
      component: ManagePage,
    },
    {
      path: '/admin/create',
      name: 'create',
      component: CreatePage,
    },
  ]
})
