
export function formatDate (date, fmt) {
  var currentDate = new Date(date)
  var o = {
    'M+': currentDate.getMonth() + 1, // 月份
    'd+': currentDate.getDate(), // 日
    'h+': currentDate.getHours(), // 小时
    'm+': currentDate.getMinutes(), // 分
    's+': currentDate.getSeconds(), // 秒
    'q+': Math.floor((currentDate.getMonth() + 3) / 3), // 季度
    'S': currentDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}
