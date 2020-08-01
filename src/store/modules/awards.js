import {reqAllAwards, reqAwardsByGro, reqAwardsByID, uploadAward, updateAward, changeAwardStatus} from '@/api/awards'

const state = {
  awd_url:'/award/showimg/{id}?id='
}

const actions = {
  reqAllAwards({commit}, {delFlag, pageNum, pageSize}){
    return new Promise((resolve, reject) => {
      reqAllAwards({delFlag, pageNum, pageSize})
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  reqAwardsByGro({commit}, {awardGroup, delFlag, pageNum, pageSize}){
    return new Promise((resolve, reject) => {
      reqAwardsByGro({awardGroup, delFlag, pageNum, pageSize})
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //根据id获取获奖信息
  reqAwardsByID({commit}, id){
    return new Promise((resolve, reject) => {
      reqAwardsByID(id)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //获奖情况上传
  uploadAward({commit},formData){
    return new Promise((resolve, reject) => {
      uploadAward(formData)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //获奖情况更新
  updateAward({commit},formData){
    return new Promise((resolve, reject) => {
      updateAward(formData)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  //获奖可用性更新
  changeAwardStatus({commit},{id, delFlag}){
    return new Promise((resolve, reject) => {
      changeAwardStatus({id, delFlag})
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
