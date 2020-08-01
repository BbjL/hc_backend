import ajax from '@/utils/ajax'

//分页获取所有视频
export function reqAllVideos({delFlag = 0, pageNum = 1, pageSize = 1000} ){
  return ajax({
    url:'/video/page',
    data:{
      delFlag,
      pageNum,
      pageSize
    },
    type:'post',
  })
}


//删除
export function changeVideoState({id, delFlag = 1}){
  return ajax({
    url:'/video/update/delFlag',
    data:{
      id,
      delFlag
    },
    type:'post',
  })
}

//更新
export function updateVideo(formData){
  return ajax({
    url:'/video/update',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//上传
export function uploadVideo(formData){
  return ajax({
    url:'/video/upload',
    data:formData,
    type:'post',
    headers:'formdata'
  })
}

//获取年份
export function getSortedYear(){
  return ajax({
    url:'/video/ages',
    type:'post',
  })
}

//根据id请求
export function reqVidByID(id){
  return ajax({
    url:'/video/details',
    data:{id},
    type:'post'
  })
}
