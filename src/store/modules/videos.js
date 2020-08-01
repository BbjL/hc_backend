import {reqAllVideos , changeVideoState, updateVideo, uploadVideo, getSortedYear, reqVidByID } from '@/api/videos'

const state = {
  vid_url :'/video/showVideo/'
}

const mutations = {}

const actions = {

  //获取所有视频
  reqAllVideos({commit},{ delFlag , pageNum , pageSize} ){
    return new Promise((resolve, reject) => {
      reqAllVideos({delFlag , pageNum , pageSize })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //删除
  changeVideoState({commit} ,{id, delFlag}){
    return new Promise((resolve, reject) => {
      changeVideoState({id, delFlag})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //更新
  updateVideo({commit},formData){
    return new Promise((resolve, reject) => {
      updateVideo(formData)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //上传
  uploadVideo({commit} ,formData){
    return new Promise((resolve, reject) => {
      uploadVideo(formData)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //获取年份
  getSortedYear({commit}){
    return new Promise((resolve, reject) => {
      getSortedYear()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //根据id获取
  reqVidByID({commit}, id){
    console.log(id)
    return new Promise((resolve, reject) => {
      reqVidByID(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
}

}

export default({
  namespace:true,
  state,
  actions,
  mutations
})

