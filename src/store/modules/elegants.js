import {
  reqEleByYear,
  reqEleByGroup,
  uploadEle,
  updateEle,
  changeEleStatus,
  reqAllYears,
  reqEleByID
} from '@/api/elegants'


const state = {
  ele_url:'/elegant/showimg/{id}?id='
}

const mutations = {}

const actions = {

  //根据年份获取
  reqEleByYear({commit} , {year, delFlag, pageNum, pageSize  }){
    return new Promise((resolve, reject) => {
      reqEleByYear({year, delFlag, pageNum , pageSize  })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //根据分组获取
  reqEleByGroup({commit}, {articleGroup, delFlag, pageNum, pageSize }){
    return new Promise((resolve, reject) => {
      reqEleByGroup({articleGroup, delFlag, pageNum, pageSize })
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  reqEleByID({commit}, id){
    return new Promise((resolve, reject) => {
      reqEleByID(id)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },


  //上传风采
  uploadEle({commit}, formData){
    return new Promise((resolve, reject) => {
      uploadEle(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //更新风采
  updateEle({commit} , formData){
    return new Promise((resolve, reject) => {
      updateEle(formData)
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //修改状态
  changeEleStatus({commit} , {id, delFlag}){
    return new Promise((resolve, reject) => {
      changeEleStatus({id, delFlag})
        .then(res =>{
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  //获取所有年份
  reqAllYears({commit}){
    return new Promise((resolve, reject) => {
      reqAllYears()
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
