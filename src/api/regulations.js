import ajax from '@/utils/ajax'

// // 11、 获取实验室制度  delFlag=0为可用  1为删除
// export const reqRegu = (delFlag =  0 ) =>ajax(BASE_URL+'/insitu/all',{delFlag}, 'post');
// // 12、 修改实验室制度
// export const updateRegu = (id,insituContent) =>ajax(BASE_URL+'/insitu/update',{id,insituContent}, 'post');
// // 13、 上传新制度
// export const uploadRegu = (insituContent) =>ajax(BASE_URL+'/insitu/upload',{insituContent}, 'post');
// // 13、 删除制度
// export const deleteRegu = (id,delFlag = 1) =>ajax(BASE_URL+'/insitu/update/delFlag',{id,delFlag}, 'post');

// 获取团队制度
export function getRegu(delFlag =  0) {
  return ajax({
    url:'/insitu/all',
    type: 'post',
    data:{
      delFlag
    },
  })
}

//上传
export function addRegu({lastUpdateBy, insituContent, lastUpdateTime}) {
  console.log(lastUpdateBy, insituContent, lastUpdateTime)
  return ajax({
    url:'/insitu/upload',
    type: 'post',
    data:{
      lastUpdateBy,
      insituContent,
      lastUpdateTime
    },
  })
}

//修改
export function updateRegu({id, lastUpdateBy, insituContent, lastUpdateTime, delFlag = 0}) {
  return ajax({
    url:'/insitu/update',
    type: 'post',
    data:{
      id,
      lastUpdateBy,
      insituContent,
      lastUpdateTime,
      delFlag
    },
  })
}

//删除
export function removeRegu(id,delFlag = 1) {
  return ajax({
    url:'/insitu/update/delFlag',
    type: 'post',
    data:{
      id,
      delFlag
    },
  })
}
