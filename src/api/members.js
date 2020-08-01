import ajax from '@/utils/ajax'

//分页获取所有状态成员信息
export function reqAllMems({pageNum = 1, pageSize =10 }){
  return ajax({
    url:'/mem/find/all',
    data:{
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//分页获取所有成员信息(在校)
export function reqWorkMems({pageNum = 1, pageSize =10 }){
  return ajax({
    url:'/mem/find/all/enabled',
    data:{
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//分组获取所有在校成员信息
export function reqWorkMemsByGroup({group, pageNum = 1, pageSize =10 }){
  return ajax({
    url:'/mem/find/group',
    data:{
      group,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//通过id获取
export function reqMmeByID(id ){
  return ajax({
    url:'/mem/find/id',
    data:{id},
    type:'post',
  })
}

//上传成员信息
export function uploadMems(formData){
  return ajax({
    url:'/mem/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//更新成员信息
export function updateMems(formData){
  return ajax({
    url:'/mem/update/all',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//修改成员状态
// 0 默认删除
export function changeMemStatus({id, memIsenable = 0}){
  return ajax({
    url:'/mem/update/status',
    data:{
      id,
      memIsenable
    },
    type:'post',
  })
}

