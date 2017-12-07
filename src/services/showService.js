/**
 * Created by john on 2017/11/9.
 */
import request from '../utils/request';
import { defaultEmail } from '../utils/constants';

/**
 * 发布一条大片儿分享
 * @param fileNames 图片文件名字列表
 * @param title 标题
 * @param description 描述
 * @param tags 标签
 * @param albumId 相册ID
 * @param email 账号
 * @returns {*|Promise.<TResult>}
 */
export function postPhoto(fileNames,title,description,tags,albumId,email) {
  const formData = new window.FormData();
  formData.append("fileNames",fileNames);
  formData.append("title",title);
  formData.append("description",description);
  formData.append("tags",tags);
  formData.append("albumId",albumId);
  formData.append("email",email);
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
 * 获得热门大片儿秀
 * @param page
 * @returns {*|Promise.<TResult>}
 */
export function getHotShow(page) {
  const email = window.sessionStorage.getItem("email") === null ? defaultEmail : window.sessionStorage.getItem("email");
  const formData = new window.FormData();
  formData.append("email",email);
  formData.append("pageNum",page);
  const promise = request('/api/show/hot',{
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

function printInfo(info,func) {
  console.log("showService/"+func+": "+info);
}
