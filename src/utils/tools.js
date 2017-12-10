/**
 * Created by john on 2017/12/7.
 */
export function getWinHeight() {
  let winHeight = 0;
  // 获取窗口高度
  if (window.innerHeight)
    winHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
  {
    winHeight = document.documentElement.clientHeight;
  }
  return winHeight;
}

export function contains(array, element) {
  for(let i=0;i<array.length;i++){
    if( array[i] === element ) {
      return true;
    }
  }
  return false;
}
