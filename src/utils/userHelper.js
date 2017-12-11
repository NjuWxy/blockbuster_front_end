

export function getUsername() {
  return window.sessionStorage.getItem("username");
}

export function getUserAvatar() {
  return window.sessionStorage.getItem("avatar");
}

export function getEmail() {
  return window.sessionStorage.getItem("email") === null ? "" : window.sessionStorage.getItem("email") ;
}

export function saveAvatar(avatar) {
  window.sessionStorage.setItem("avatar",avatar);
}

export function saveUser(email,username,avatar) {
  window.sessionStorage.setItem("username",username);
  window.sessionStorage.setItem("avatar",avatar);
  window.sessionStorage.setItem("email",email);
}

export function removeUser() {
  window.sessionStorage.removeItem("username");
  window.sessionStorage.removeItem("avatar");
  window.sessionStorage.removeItem("email");
}

export function showFollowButton(email) {
  return window.sessionStorage.getItem("email") !== email;
}

export function isSelf(email) {
  return window.sessionStorage.getItem("email") === email;
}

export function isLogin() {
  return window.sessionStorage.getItem("email") !== null;
}
