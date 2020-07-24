import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from  './state'

import sliderRoutes from './modules/sliderRoutes'  //侧边栏路由显示
import cancelRequest from './modules/cancelRequest' //跳转页面前取消请求
import user from './modules/user'
import resource from './modules/resource'
import regulations from './modules/regulations'



Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    sliderRoutes,
    cancelRequest,
    user,
    resource,
    regulations
  },
  actions,
  getters,
  mutations,
  state
})
