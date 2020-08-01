import axios from 'axios'
import store from '@/store/index'
import qs from 'qs'


export default function ajax (url, data, type='GET',headers) {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {   //Object.keys()返回所有元素为字符串的数组,其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&')) //截取字符串
        url = url + '?' + dataStr  //格式 url?username=kobe
      }
      // 发送get请求
      promise = axios.get(url , {}) //默认添加localhost
    }
    else {
      // 发送post请求
      if(headers === 'formdata'){ //发送formdata数据
        promise = axios.post(url,data, {
          headers: {
            'Content-Type': 'multipart/form-data'  //表单数据请求
          }
        })  //axios返回的是promise对象
      }else{
        data = qs.stringify(data);
        promise = axios.post(url, data)  //axios返回的是promise对象
      }
    }

    promise
      .then(function (response) {
        // 成功了调用resolve()
        resolve(response.data)
      })
      .catch(function (error) {
        //失败了调用reject()
        reject(error)
      })

  })
}


const CancelToken = axios.CancelToken;

/**
 * /防止重复请求
 * */
let removePending = (config) => {
  for (let k in store.state['axiosPromiseCancel']) {
    if (store.state['axiosPromiseCancel'][k].url === config.url + '&' + config.method) { //当前请求在数组中存在时执行函数体
      store.state['axiosPromiseCancel'][k].cancel(); //执行取消操作
      store.state['axiosPromiseCancel'].splice(k, 1); //把这条记录从数组中移除
    }
  }
};


/**
 * 请求拦截
 * */
axios.interceptors.request.use(config=>{

  config.cancelToken = new CancelToken ( cancel => {

    removePending(config)                 //防止重复请求

    let cancelTarget = {
      url: config.url,
      method: config.method,
      cancel : cancel
    } ;

    store.commit('ADD_CANCEL_REQUEST' , cancelTarget) // 将请求添加进数组

  })

  return config;
});


/**
 * 响应拦截
 * */
axios.interceptors.response.use( res => {
  return res
}, error => {
  return Promise.reject(error)
})
