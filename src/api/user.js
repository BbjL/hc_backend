import ajax from '@/utils/ajax'

//登陸請求
export function loginIn(data = {}){
  return ajax({
    url:'/login',
    data,
    type:'POST',
})
}

//獲取sessionid
export function getSessionID(data = {}){
  return ajax({
    url:'/user/get_jsessionId.do',
    data,
    type:'GET'
  })
}
