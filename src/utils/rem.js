const baseSize = 32;
function setRem () {
  const scale = document.documentElement.clientWidth / 1920;
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}
setRem();
window.onresize = function () {
  setRem();
};
