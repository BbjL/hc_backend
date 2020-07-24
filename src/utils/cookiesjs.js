const cookies =  {

  //设置cookie
  set(key , value , duration = 600 * 1000){
    const date  = new Date().getTime() +  duration * 1000
    const _key = key.trim()
    const _value = value.toString().trim()
    document.cookie = _key + '=' + _value + ';expires=' + new Date(date).toUTCString();
  },

  //获取cookie
  get(key){

    if(document.cookie === '') return "" ;

    let obj = {};        //最终获得所有的cookie对象
    let cookiesArr = []; // 分割cookies字符串

    cookiesArr = document.cookie.split(';');
    for(let value of cookiesArr){
      const item =  value.split('=');
      obj[item[0].trim()] = item[1].trim()
    }

    if(key){
      const _key = key.trim()
      return obj[_key]
    }else{
      return obj
    }

  },

  //删除cookie
  remove(key){
    const _key = key.trim();
    const date = new Date().getTime() - 1;
    document.cookie = _key + '=;expires=' + new Date(date).toUTCString();
  }

}

export default cookies
