import auth from '@/utils/auth'
import {loginIn , getSessionID } from '@/api/user'

const state = {}

const actions = {
  //登陆
  loginIn({commit},userInfo){
    return new Promise((resolve , reject) => {
      loginIn(userInfo)
        .then( res => {
          return  getSessionID()  //這裡並沒有用到
        })
        .then( () => {
          auth.setAdminInfo('username' , userInfo.username )
          resolve()
        })
        .catch(error =>{
          reject(error)
        })
    })
  },

  //获取sessionid
  getSessionID({commit}){
    return new Promise((resolve, reject) => {
      getSessionID()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {}

export default({
    namespace:true,
    state,
    actions,
    mutations
})

