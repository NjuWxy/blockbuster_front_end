/**
 * Created by john on 2017/12/6.
 */
import request from '../utils/request';

/**
 * 注册
 * @param username 昵称
 * @param email 邮箱（账号）
 * @param password 密码
 * @returns {*|Promise.<TResult>}
 */
export function signUp(username,email,password) {
  const formData = new window.FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  const promise = request('/api/user/signup', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"signUp");
    return v.data;
  });
}

/**
 * 登陆
 * @param email
 * @param password
 * @returns {*|Promise.<TResult>}
 */
export function login(email,password) {
  const formData = new window.FormData();
  formData.append('email', email);
  formData.append('password', password);
  const promise = request('/api/user/login', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"login");
    return v.data;
  });
}

/**
 * 注销账号
 * @returns {*|Promise.<TResult>}
 */
export function signOut() {
  const email = window.sessionStorage.getItem("email");
  const formData = new window.FormData();
  formData.append("email",email);
  const promise = request('/api/user/signout',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"signOut");
    return v.data;
  })
}

/**
 * 获得该用户所有的相册
 * @returns {Promise.<TResult>|*}
 */
export function getAlbums() {
  const email = window.sessionStorage.getItem("email");
  const formData = new window.FormData();
  formData.append("email",email);
  const promise = request('/api/album/get',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getAlbums");
    return v.data;
  });
}

/**
 * 创建新专辑
 * @param album 专辑名称
 * @returns {Promise.<TResult>|*}
 */
export function createAlbum(album) {
  const email = window.sessionStorage.getItem("email");
  const formData = new window.FormData();
  formData.append("email",email);
  formData.append("album",album);
  const promise = request('/api/album/create',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"createAlbum");
    return v.data;
  });
}

function printInfo(info,func) {
  console.log("userService/"+func+": "+info);
}
