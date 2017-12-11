/**
 * Created by john on 2017/11/9.
 */
import request from '../utils/request';
import { defaultEmail } from '../utils/constants';
import { getEmail } from '../utils/userHelper';

export function postPhoto(fileNames,title,description,tags,albumTitle) {
  const formData = new window.FormData();
  formData.append("fileNames",fileNames);
  formData.append("title",title);
  formData.append("description",description);
  formData.append("tags",tags);
  formData.append("albumTitle",albumTitle);
  formData.append("email",getEmail());
  const promise = request('/api/show/post',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"postPhoto");
    return v.data;
  });
}

/**
 * 得到热门的六个标签
 * @returns {Promise.<TResult>|*}
 */
export function getHotTags() {
  const promise = request('/api/show/tags');
  return promise.then((v) => {
    printInfo(v.data,"getHotTags");
    return v.data;
  });
}


/**
 * 获得热门大片儿秀
 * @param page
 * @returns {*|Promise.<TResult>}
 */
export function getHotShow(page) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  formData.append("pageNum",page);
  const promise = request('/api/show/hot',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    // printInfo(v.data,"getHotShow");
    return v.data;
  });
}

export function getCareShows() {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  const promise = request('/api/show/care',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getCareShows");
    return v.data;
  });
}

export function getMyShow(email=getEmail()) {
  const formData = new window.FormData();
  formData.append("email",email);
  formData.append("visitorEmail",getEmail());
  const promise = request('/api/show/myShow',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getMyShow");
    return v.data;
  });
}

export function searchShow(key) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  formData.append("key",key);
  const promise = request('/api/show/search',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"searchShow");
    return v.data;
  });
}

export function getDetail(sid) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  formData.append("sid",sid);
  const promise = request('/api/show/detail',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getDetail");
    return v.data;
  });
}

export function likeShow(sid) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  formData.append("sid",sid);
  const promise = request('/api/show/likeShow',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"likeShow");
    return v.data;
  });
}

export function cancelLikeShow(sid) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  formData.append("sid",sid);
  const promise = request('/api/show/cancelLikeShow',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"cancelLikeShow");
    return v.data;
  });
}


function printInfo(info,func) {
  console.log("showService/"+func+": "+info);
}
