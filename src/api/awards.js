import ajax from '@/utils/ajax'

//根据可用性分页获取全部获奖情况
export function reqAllAwards({delFlag = 0, pageNum = 1, pageSize = 10}){
  return ajax({
    url:'/award/find/all',
    data:{
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//根据组别分页获取获奖情况
export function reqAwardsByGro({awardGroup, delFlag = 0, pageNum = 1, pageSize = 10}){
  return ajax({
    url:'/award/find/group',
    data:{
      awardGroup,
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//根据id获取获奖信息
export function reqAwardsByID(id){
  console.log(id)
  return ajax({
    url: '/award/find/id',
    data:{id},
    type:'post',
  })
}

//获奖情况上传
export function uploadAward(formData){
  return ajax({
    url:'/award/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//获奖情况更新
export function updateAward(formData){
  return ajax({
    url:'/award/update',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//获奖可用性更新
export function changeAwardStatus({id, delFlag = 1}){
  return ajax({
    url:'/award/update/delFlag',
    data:{
      id, delFlag
    },
    type:'post',
  })
}
