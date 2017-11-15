import request from '../utils/request';

export function getUserInfo() {

  const promise = request('/api/user');
  console.log(promise);
  return promise.then((v) => {
    console.log(v.data);
    return v.data;
  });
}
