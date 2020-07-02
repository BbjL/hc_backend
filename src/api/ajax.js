/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
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
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('npm run dev&')) //截取字符串
        url = url + '?' + dataStr  //格式 url?username=kobe
      }
      // 发送get请求
      promise = axios.get(url) //默认添加localhost
    } else {
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
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

