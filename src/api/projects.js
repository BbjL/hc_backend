import ajax from '@/utils/ajax'

//获取全部项目
export function reqAllPros(){
  return ajax({
    url:'/pro/all',
    type:'type',
  })
}

//根据id获取
export function reqProByID(id){
  return ajax({
    url:'/pro/find/id',
    data:{id},
    type:'post',
  })
}

//根据可用性分页获取
export function reqProByPage({delFlag = 0, pageNum = 1, pageSize = 999}){
  return ajax({
    url:'/pro/find/status',
    data:{
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

// 分组获取项目
export function reqProByGroup(group){
  return ajax({
    url:'/pro/group',
    data:{group},
    type:'post',
  })
}

// 项目上传
export function uploadPros(formData){
  return ajax({
    url:'/pro/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

// 项目修改
export function updatePros(formData){
  return ajax({
    url:'/pro/update',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}
