import ajax from '@/utils/ajax'

// // 14、 上传实验室资源
// export const uploadReso = (resource) =>ajax(BASE_URL+'/res/upload',resource, 'post' , 'formdata');
// // 15、 获取实验室资源  0位可用  1为删除
// export const reqAllReso = (delFlag = 0) =>ajax(BASE_URL+'/res/find/all',{delFlag}, 'post');
// // 16、 修改实验室资源
// export const updateReso = (formdata) =>ajax(BASE_URL+'/res/update',formdata, 'post','formdata');
// // 16、 删除实验室资源  0位可用  1为删除
// export const deleteReso = (id , delFlag  = 1) => ajax(BASE_URL +'/res/update/del' , {id,delFlag} , 'post');


//获取奖项
export function getResource(delFlag = 0){
  return ajax({
    url:'/res/find/all',
    data:{
      delFlag
    },
    type:'post',
  })
}

//添加
export function addResource(formData){
  return ajax({
    url:'/res/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//更新
export function updateResource(formData){
  console.log(formData)
  return ajax({
    url:'/res/update',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//删除
export function removeResource(id, delFlag = 1){
  return ajax({
    url:'/res/update/del',
    data:{
      id,
      delFlag
    },
    type:'post',
  })
}



