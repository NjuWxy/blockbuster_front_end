/**
 * Created by john on 2017/11/9.
 */
import request from '../utils/request';

export function postPhoto(share) {
  const promise = request('/api/show/postPhoto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(share),
  });
  console.log(promise);
  return promise.then((v) => {
    console.log(v.data);
    return v.data;
  });
}
