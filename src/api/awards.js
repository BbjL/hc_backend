import ajax from '@/utils/ajax'

//添加
export function add(data = {}){
  return ajax({
    url:'/path',
    data,
    type:'type',
  })
}

//删除
export function remove(data = {}){
  return ajax({
    url:'/path',
    data,
    type:'type',
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
