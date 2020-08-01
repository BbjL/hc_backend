import ajax from '@/utils/ajax'

//根据年份获取
export function reqEleByYear({year, delFlag = 0, pageNum = 1, pageSize = 999 }){
  return ajax({
    url:'/elegant/age',
    data:{
      year,
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//根据分组获取
export function reqEleByGroup({articleGroup, delFlag = 0, pageNum = 1, pageSize = 999 }){
  return ajax({
    url:'/elegant/group',
    data:{
      articleGroup,
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//根据id获取
export function reqEleByID(id){
  return ajax({
    url:'/elegant/details',
    data:{id},
    type:'post',
  })
}

//添加
export function uploadEle(formData){
  return ajax({
    url:'/elegant/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//修改
export function updateEle(formData){
  return ajax({
    url:'/elegant/update',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//修改状态
export function changeEleStatus({id, delFlag = 1 }){
  return ajax({
    url:'/elegant/update/delFlag',
    data:{
      id,
      delFlag
    },
    type:'post',
  })
}

//获取所有年份
export function reqAllYears(){
  return ajax({
    url:'/elegant/ages',
    type:'post',
  })
}
