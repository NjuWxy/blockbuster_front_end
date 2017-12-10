/**
 * Created by john on 2017/12/6.
 */
import request from '../utils/request';
import { getEmail } from '../utils/userHelper';

export function getAlbums() {
  const formData = new window.FormData();
  formData.append("email",getEmail());
  const promise = request('/api/album/get',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    // printInfo(v.data,"getAlbums");
    return v.data;
  });
}

export function createAlbum(album) {
  const formData = new window.FormData();
  formData.append("email",getEmail());
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

export function deleteAlbum(aid) {
  const formData = new window.FormData();
  formData.append("aid",aid);
  const promise = request('/api/album/delete',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"deleteAlbum");
    return v.data;
  });
}

export function getAlbumDetail(aid) {
  const formData = new window.FormData();
  formData.append("aid",aid);
  const promise = request('/api/album/detail',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getAlbumDetail");
    return v.data;
  });
}



function printInfo(info,func) {
  console.log("userService/"+func+": "+info);
}

