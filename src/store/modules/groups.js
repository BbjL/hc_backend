import {reqAllGroups , reqAllDeleteGroups, changeGroupState, uploadGroup, updateGroup } from '@/api/groups'


const state = {}

const mutations = {}

const actions = {

  //请求组别
  reqAllGroups({commit} , {pageNum , pageSize  }){
    return new Promise((resolve, reject) => {
      reqAllGroups({pageNum, pageSize })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //获取已删除组别
  reqAllDeleteGroups({commit}){
    return new Promise((resolve, reject) => {
      reqAllDeleteGroups()
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //改变组别删除显示状态
  changeGroupState({commit}, {id , groupIsenabled }){
    return new Promise((resolve, reject) => {
      changeGroupState({id , groupIsenabled })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //上传组别
  uploadGroup({commit} , formData){
    return new Promise((resolve, reject) => {
      uploadGroup(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //更新组别
  updateGroup({commit} , formData){
    return new Promise((resolve, reject) => {
      updateGroup(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

}

export default ({
  namespace:true,
  state,
  mutations,
  actions
})
