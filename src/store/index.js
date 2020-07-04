import Vue from 'vue'
import Vuex from 'vuex'
import sliderRoutes from './modules/sliderRoutes'  //侧边栏路由显示
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from  './state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    sliderRoutes
  },
  actions,
  getters,
  mutations,
  state
})
