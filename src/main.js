// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './style/reset.css'
import './style/reEleUI.css'
import './style/animate.css'
import './style/main.css'


import 'default-passive-events'             //chrome冲突解决

import $ from 'jquery'

import {Plugin} from 'vue-fragment'     //去除多余跟标签

import cookies from '@/utils/cookiesjs'
import auth from '@/utils/auth'
import {getFormatTime} from "./utils/globalMethods";

Vue.use(ElementUI);
Vue.use(Plugin);

Vue.prototype.$cookies = cookies
Vue.prototype.$getFormatTime = getFormatTime


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


/**
 * 路由守卫
 * 切换路由前
 * */
router.beforeEach((to, from, next) => {

  CancelRequest() // 取消上个页面未加载请求

  if(!to.meta.notReqLogin){
    const uid = auth.getAdminInfo('username');  //每次跳转路由前校验cookie  没有则重定向到/login

    if(uid){
      next()
    }else{
      next({
        path:'/login',
        query: {redirect: to.meta.fullPath} //登陆失效跳转到login 并记录登陆前路由地址
      });
    }

  }else{
    next()
  }
})


/**
 * 取消上个页面为请求完成的请求
 * */
function CancelRequest(){
  const cancelArr =  store.state['cancelRequest'].axiosPromiseCancel

  if(cancelArr.length > 0){
    cancelArr.forEach(req => {
      req.cancel&&req.cancel();
      store.commit('CLEAR_ALLREQ')
    })
  }

}
