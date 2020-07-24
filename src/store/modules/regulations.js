import {addRegu, getRegu, removeRegu, updateRegu} from '@/api/regulations'

const state = {}

const actions = {
  getRegu({commit}){
    return new Promise((resolve, reject) => {
      getRegu()
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  addRegu({commit}, {lastUpdateBy, insituContent, lastUpdateTime}){
    return new Promise((resolve, reject) => {
      addRegu({lastUpdateBy, insituContent, lastUpdateTime })
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  updateRegu({commit}, {id, lastUpdateBy, insituContent, lastUpdateTime}){
    return new Promise((resolve, reject) => {
      updateRegu({id, lastUpdateBy, insituContent, lastUpdateTime})
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  },

  removeRegu({commit},id){
    return new Promise((resolve, reject) => {
      removeRegu(id)
        .then(res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  }
}

const mutations = {}

export default({
  namespace:true,
  state,
  mutations,
  actions
})
