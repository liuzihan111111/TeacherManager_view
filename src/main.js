import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router, { adminRouterMap, teacherRouterMap, majorRouterMap } from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
// 登录后角色判读
var routes = router.options.routes
const role = localStorage.getItem('role')
if (role === '0') {
  routes = [...routes, ...adminRouterMap]
  store.commit('initRoutes', routes)
  router.addRoutes(adminRouterMap)
}
if (role === '1') {
  routes = [...routes, ...teacherRouterMap]
  store.commit('initRoutes', routes)
  router.addRoutes(teacherRouterMap)
}
if (role === '2') {
  routes = [...routes, ...majorRouterMap]
  store.commit('initRoutes', routes)
  router.addRoutes(majorRouterMap)
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
