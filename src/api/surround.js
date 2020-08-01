import ajax from '@/utils/ajax'

//获取所有氛围
export function reqAllSurround({delFlag = 0, pageNum = 1, pageSize = 999 }){
  return ajax({
    url:'/atm/find/all',
    data:{
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

// 根据ID获取团队氛围
export function reqSurroundByID(id){
  return ajax({
    url:'/atm/find/one',
    data:{id},
    type:'post',
  })
}

//修改团队氛围
export function updateSurround(formData){
  return ajax({
    url:'/atm/update/all',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//上传团队氛围
export function uploadSurround(formData){
  return ajax({
    url:'/atm/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

// 是否删除氛围
export function changeSurroundStatus({id, delFlag = 1}){
  return ajax({
    url:'/atm/update/del',
    data:{
      id,
      delFlag
    },
    type:'post',
  })
}
