import {addResource , removeResource, getResource, updateResource } from '@/api/resource'

const state = {
    reso_imagesUrl:'/res/showimg/{id}?id='
}

const actions = {
  //添加设备
  addResource({commit},resource){
    return new Promise((resolve , reject) => {
      addResource(resource)
        .then( res => {
          resolve(res)
        })
        .catch(err =>{
          reject(err)
        })
    })
  },

  //删除资源
  removeResource({commit}, {id, delFlag}){
    return new Promise(((resolve, reject) => {
      removeResource(id, delFlag)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }))
  },

  //获取资源
  getResource({commit}, delFlag){
    return new Promise(((resolve, reject) => {
      getResource()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }))
  },

  //更新资源
  updateResource({commit}, resource){
    return new Promise(((resolve, reject) => {
      updateResource(resource)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }))
  }
}

const mutations = {}

export default({
  namespace:true,
  state,
  actions,
  mutations
})

