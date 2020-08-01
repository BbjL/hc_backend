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
import videos from './modules/videos'
import groups from './modules/groups'
import elegants from './modules/elegants'
import surround from './modules/surround'
import projects from './modules/projects'
import members from './modules/members'
import awards from './modules/awards'
import emails from './modules/emails'


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    sliderRoutes,
    cancelRequest,
    user,
    resource,
    regulations,
    videos,
    groups,
    elegants,
    surround,
    projects,
    members,
    awards,
    emails
  },
  actions,
  getters,
  mutations,
  state
})
