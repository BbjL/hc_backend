import cookies from './cookiesjs'

export default {
  /**
   * 用户信息
   * */
  setAdminInfo(key , value){
    cookies.set(key , value)
  },

  getAdminInfo(key){
    return cookies.get(key)
  },

  removeAdminInfo(key){
    cookies.remove(key)
  },

  /**
   * 登陆令牌
   * */
  setLoginToken(value){
    cookies.set('LoginToken' , value)
  },

  getLoginToken(){
    return cookies.get('LoginToken' , value)
  },

  removeLoginToken(){
    cookies.remove('LoginToken' , value)
  }

}
