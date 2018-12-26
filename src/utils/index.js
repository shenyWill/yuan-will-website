/**
 * @description 格式化日期
 * @author shenyuan
 * @export
 * @param {*} obj
 * @returns
 */
export function parseTime (obj) {
  if (!obj) {
    return '';
  }
  let date = new Date(obj);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}
/**
 * @description 两个日期相差天数
 * @author shenyuan
 * @export
 * @param {*} startTime
 * @param {*} endTime
 * @returns
 */
export function disTime (startTime, endTime) {
  startTime = new Date(parseTime(startTime));
  endTime = new Date(parseTime(endTime));
  return parseInt((endTime - startTime) / 1000 / 60 / 60 / 24);
}

export function smoothscroll () {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
}
