export function getFormatTime(){
  let date = '';

  const now = new Date().toLocaleDateString();
  date = now.replace(/\//g , '-')

  return date
}
