import ajax from '@/utils/ajax'

//获取邮件
export function reqEmail(pageNum = 1, pageSize = 10){
  return ajax({
    url:'/email/find/all',
    data:{
      pageNum,
      pageSize
    },
    type:'post',
  })
}

//删除
export function deleteEmail(ids ,delFlag =1 ){
  return ajax({
    url:'/email/update/del',
    data:{
      ids,
      delFlag
    },
    type:'post',
  })
}

//获取奖项
export function get(data = {}){
  return ajax({
    url:'/path',
    data,
    type:'type',
  })
}

//更新
export function update(data = {}){
  return ajax({
    url:'/path',
    data,
    type:'type',
  })
}
