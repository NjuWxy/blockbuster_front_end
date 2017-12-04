/**
 * Created by john on 2017/10/27.
 */
import * as userService from '../services/example';

export default {
  namespace: 'users',
  state: {
    isLogin: (window.sessionStorage.getItem('email') !== null),
    username: 'Shea_Wong'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname })=> {
        if(pathname === '/UserPage') {
          dispatch({
            type:'test'
          });
        }
      });
    }
  },

  effects: {
    * test({ payload }, { call, put }) {
      console.log('userinfo');
      yield call(userService.getUserInfo);
    },
  },

  reducers: {

  }
};
