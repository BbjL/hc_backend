export function getFormatTime(){
  let date = '';

  const now = new Date().toLocaleDateString();
  date = now.replace(/\//g , '-')

  return date
}


export function VueDebounce(fnName, time) {
  let timeout = null;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fnName]();
    }, time);
  };
}

