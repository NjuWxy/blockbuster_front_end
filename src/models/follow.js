/**
 * Created by john on 2017/12/7.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as userService from '../services/userService';
export default {

  namespace: 'follow',
  state: {
    followedUsers: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/UserFollow') {
          dispatch({
            type: 'getFollowedUsers',
          });
        }
      });
    },
  },

  effects: {
    *getFollowedUsers({ payload }, { call, put }) {  // eslint-disable-line
      const followedUsers = yield call(userService.getFollowedUsers);
      yield put(
        {
          type: 'saveFollowedUsers',
          payload: { followedUsers }
        }
      );
    },
    *followUser({ payload:{followedEmail, pathname, sid}}, {call,put}) {
      console.log(followedEmail);
      const result = yield call(userService.followUser, followedEmail);
      if(!result){
        message.error("关注失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname,
          query: pathname==='/ShowInfo'?{sid}:{}
        }))
      }
    },
    *cancelFollowUser({ payload:{followedEmail, pathname, sid}}, {call,put}) {
      const result = yield call(userService.cancelFollowUser, followedEmail);
      if(!result){
        message.error("取消关注失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname,
          query: pathname==='/ShowInfo'?{sid}:{}
        }))
      }
    },
    *cancelFollowUsers({ payload:{followedEmails}}, {call,put}) {
      const result = yield call(userService.cancelFollowUsers, followedEmails);
      if(!result){
        message.error("取消关注失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname: '/UserFollow',
        }))
      }
    },
  },

  reducers: {
    saveFollowedUsers(state, { payload: { followedUsers }}) {
      return { ...state, followedUsers };
    },
  },

};

