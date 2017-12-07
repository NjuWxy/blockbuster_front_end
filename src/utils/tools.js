/**
 * Created by john on 2017/12/7.
 */
export function getWinHeight() {
  let minHeight = 0;
  if (window.innerHeight)
    minHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
    minHeight = document.body.clientHeight;
  return minHeight;
}
