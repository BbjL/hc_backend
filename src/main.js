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

import VideoPlayer from 'vue-video-player'  // video插件库
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

import {Plugin} from 'vue-fragment'     //去除多余跟标签

import cookies from '@/utils/cookiesjs'
import {getFormatTime} from "./utils/globalMethods";

import '@/utils/permissions'  //登陆验证

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


