
// 将日期格式化输出 “2015|08|24”
export function Format(date, s) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + s + month + s + day
}
