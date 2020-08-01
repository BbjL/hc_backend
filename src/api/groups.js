import ajax from '@/utils/ajax'

//无条件获取组别
export function reqAllGroups({pageNum = 1, pageSize = 1000 }){
  return ajax({
    url:'/group/find/allno',
    data:{
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//获取删除列表
export function reqAllDeleteGroups(){
  return ajax({
    url: '/group/find/unable',
    data:{},
    type:'post',
  })
}

//修改组别状态
export function changeGroupState({id , groupIsenabled }){
  return ajax({
    url:'/group/update/enable',
    data:{
      id , groupIsenabled
    },
    type:'post',
  })
}

//组别上传
export function uploadGroup(formData){
  return ajax({
    url: '/group/upload',
    data:formData,
    type:'post',
    headers:"formdata"
  })
}

//更新
export function updateGroup(formData){
  return ajax({
    url:'/group/update',
    data:formData,
    type:'post',
    headers:"formdata"
  })
}
