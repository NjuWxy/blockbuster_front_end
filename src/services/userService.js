/**
 * Created by john on 2017/12/6.
 */
import request from '../utils/request';
import { getEmail } from '../utils/userHelper';

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

export function postAvatar(fileName) {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  formData.append('fileName', fileName);
  const promise = request('/api/user/postAvatar', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"postAvatar");
    return v.data;
  });
}

export function changePassword(oldPassword,newPassword) {
  const formData = new window.FormData();
  formData.append('email', getEmail());
  formData.append('oldPassword', oldPassword);
  formData.append('newPassword', newPassword);
  const promise = request('/api/user/changePassword', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"changePassword");
    return v.data;
  });
}

export function getUserInfo(email) {
  const formData = new window.FormData();
  formData.append('email',email);
  const promise = request('/api/user/getUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getUser");
    return v.data;
  });
}

/**
 * 判断是否已经关注
 * @param followedEmail 被关注的人的email
 */
export function getIsFollowed(followedEmail) {
  const formData = new window.FormData();
  formData.append('followerEmail',getEmail() );
  formData.append('followedEmail', followedEmail);
  const promise = request('/api/user/isFollowed', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getIsFollowed");
    return v.data;
  });
}

export function followUser(followedEmail) {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  formData.append('followedEmail', followedEmail);
  const promise = request('/api/user/followUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"follow");
    return v.data;
  });
}

export function cancelFollowUser(followedEmail) {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  formData.append('followedEmail', followedEmail);
  const promise = request('/api/user/cancelFollowUser', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"cancelFollowUser");
    return v.data;
  });
}

export function cancelFollowUsers(followedEmails) {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  formData.append('followedEmails', followedEmails);
  const promise = request('/api/user/cancelFollowUsers', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"cancelFollowUsers");
    return v.data;
  });
}

export function getFollowedUsers() {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  const promise = request('/api/user/getFollowedUsers', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getFollowedUsers");
    return v.data;
  });
}

export function getMessage() {
  const formData = new window.FormData();
  formData.append('email',getEmail() );
  const promise = request('/api/user/message', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"message");
    return v.data;
  });
}

// export function getHasNewMessage() {
//   const formData = new window.FormData();
//   formData.append('email',getEmail() );
//   const promise = request('/api/user/hasNewMessage', {
//     method: 'POST',
//     body: formData,
//   });
//   return promise.then((v) => {
//     printInfo(v.data,"message");
//     return v.data;
//   });
// }



function printInfo(info,func) {
  console.log("userService/"+func+": "+info);
}
