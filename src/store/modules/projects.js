import {reqAllPros, reqProByID, reqProByPage, reqProByGroup, uploadPros, updatePros} from '@/api/projects'

const state = {
  pro_url:'/pro/showimg/{id}?id='
}

const actions = {

  //获取所
  reqAllPros({commit}){
    return new Promise((resolve, reject) => {
      reqAllPros()
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //根据id获取
  reqProByID({commit}, id){
    return new Promise((resolve, reject) => {
      reqProByID(id)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //根据可用性分页获取
  reqProByPage({commit}, {delFlag, pageNum, pageSize}){
    return new Promise((resolve, reject) => {
      reqProByPage({delFlag, pageNum, pageSize})
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //分组获取项目
  reqProByGroup({commit},group){
    return new Promise((resolve, reject) => {
      reqProByGroup(group)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

// 项目上传
  uploadPros({commit},formData){
    return new Promise((resolve, reject) => {
      uploadPros(formData)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //项目修改
  updatePros({commit},id){
    return new Promise((resolve, reject) => {
      updatePros(id)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

}

const mutations = {}

export default({
  namespace:true,
  state,
  mutations,
  actions
})
