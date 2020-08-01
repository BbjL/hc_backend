import router from '@/router';
import store from "@/store";
import auth from '@/utils/auth';


/**
 * 路由守卫
 * 切换路由前
 * */
router.beforeEach(async (to, from, next) => {

  CancelRequest() // 取消上个页面未加载请求

  if(to.name === 'login'){      //避免无线循环
    next()
    return
  }

  Promise.resolve()
    .then(() => {
      if(!to.meta.notReqLogin){ //需要路由校验的路由和拥有cookie
        return store.dispatch('getSessionID')
      }else {
        return Promise.reject()
      }
    })
    .then(res => {
      if( auth.getAdminInfo('username' )){
        next()
      }else{
        return Promise.reject()
      }
    })
    .catch(err => {
      next({
        path:'/login',
        query: {redirect: to.meta.fullPath} //登陆失效跳转到login 并记录登陆前路由地址
      });
    })

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
