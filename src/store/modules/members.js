import {reqAllMems , reqWorkMems, reqWorkMemsByGroup, uploadMems, updateMems, changeMemStatus,reqMmeByID } from '@/api/members'


const state = {
  mem_url:"/mem/showimg/{id}?id="
}

const mutations = {}

const actions = {

  //分页获取所有状态成员信息
  reqAllMems({commit} , {pageNum, pageSize }){
    return new Promise((resolve, reject) => {
      reqAllMems({pageNum, pageSize })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //分页获取所有成员信息(在校)
  reqWorkMems({commit}, {pageNum, pageSize}){
    return new Promise((resolve, reject) => {
      reqWorkMems({pageNum, pageSize})
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //分组获取所有在校成员信息
  reqWorkMemsByGroup({commit}, {group, pageNum, pageSize }){
    return new Promise((resolve, reject) => {
      reqWorkMemsByGroup({group, pageNum, pageSize })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //通过id获取
  reqMmeByID({commit}, id){
    return new Promise((resolve, reject) => {
      reqMmeByID(id)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //上传成员信息
  uploadMems({commit} , formData){
    return new Promise((resolve, reject) => {
      uploadMems(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //更新成员信息
  updateMems({commit} , formData){
    return new Promise((resolve, reject) => {
      updateMems(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //修改成员状态
  changeMemStatus({commit} , {id, memIsenable}){
    return new Promise((resolve, reject) => {
      changeMemStatus({id, memIsenable})
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
