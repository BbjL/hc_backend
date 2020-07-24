import store from '@/store/index'
import axios from 'axios'


const state = {
  // axios取消请求
  axiosPromiseCancel:[]
}

const actions = {};

const mutations = {
  //将所有请求加入数组
  ADD_CANCEL_REQUEST(state , cancelRequest){
    state.axiosPromiseCancel.push({url:cancelRequest.url + '&' + cancelRequest.method , cancel:cancelRequest.cancel})
  },
  //成功取消上一个页面未完成请求后 ， 清除 axiosPromiseCancel 内所有请求
  CLEAR_ALLREQ(state){
    state.axiosPromiseCancel = []
  }
}

export default({
  namespace:true,
  actions,
  mutations,
  state
})



