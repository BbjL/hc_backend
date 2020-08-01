import {reqAllSurround,
  reqSurroundByID,
  updateSurround,
  uploadSurround,
  changeSurroundStatus
} from '@/api/surround'

const state = {}

const mutations = {}

const actions = {

  //获取所有氛围
  reqAllSurround({commit}, {delFlag, pageNum, pageSize }){
    return new Promise((resolve, reject) => {
      reqAllSurround({delFlag, pageNum, pageSize })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 根据ID获取团队氛围
  reqSurroundByID({commit}, id){
    return new Promise((resolve, reject) => {
      reqSurroundByID(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 修改团队氛围
  updateSurround({commit}, formData){
    return new Promise((resolve, reject) => {
      updateSurround(formData)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 上传团队氛围
  uploadSurround({commit}, formData){
    return new Promise((resolve, reject) => {
      uploadSurround(formData)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // 上传团队氛围
  changeSurroundStatus({commit}, {id, delFlag }){
    return new Promise((resolve, reject) => {
      changeSurroundStatus({id, delFlag })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}


export default ({
  namespace: true,
  state,
  actions,
  mutations
})
