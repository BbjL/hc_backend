import {
  reqEmail,
  deleteEmail,
} from '@/api/emails'

const state = {}

const mutations = {}

const actions = {

  //获取所有邮箱
  reqEmail({commit}, pageNum, pageSize){
    return new Promise((resolve, reject) => {
      reqEmail(pageNum, pageSize)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // deleteEmail
  deleteEmail({commit}, ids ,delFlag){
    return new Promise((resolve, reject) => {
      deleteEmail(ids ,delFlag)
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
