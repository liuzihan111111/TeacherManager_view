import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    initRoutes(state, routes) {
      state.routes = routes
    }
  },
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
