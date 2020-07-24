import router from '@/router/index'

const state = {
  routes:[]
}

const actions = {
  sliderRoutes({commit} ){
    commit('SETROUTES' ,{routes:router.options.routes})
  }
}

const mutations = {
  SETROUTES(state , obj){
    const routes = obj.routes;
    state.routes = filterAsyncRoutes(routes)
  }
}

export default({
  namespace:true,
  actions,
  mutations,
  state
})


/**
 *  过滤掉不显示的路由
 * */
export const filterAsyncRoutes = function(routes){

  let res = []

  routes.forEach( (route,index) => {
    if(!(route.meta&&route.meta.noShow&&route.meta.noShow === true)){
      if(route.children){
        route.children = filterAsyncRoutes(route.children)
      }
      res.push(route)
    }
  })

  return res
}
