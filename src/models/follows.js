/**
 * Created by john on 2017/12/7.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as followService from '../services/followService';
export default {

  namespace: 'follows',
  state: {
    follows: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {// eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/UserFollow') {
          dispatch({
            type: 'getFollows',
          });
        }
      });
    },
  },

  effects: {
    *getFollows({ payload }, { call, put }) {  // eslint-disable-line
      const follows = yield call(followService.getFollows);
      yield put(
        {
          type: 'saveFollows',
          payload: { follows }
        }
      );
    },
    *cancelFollow({ payload:{memberEmails}}, {call,put}) {
      const result = yield call(followService.cancelFollow, memberEmails);
      if(!result){
        message.error("删除失败，请稍后重试");
      }else {
        yield put(routerRedux.push({
          pathname:"/UserFollow"
        }))
      }
    },
  },

  reducers: {
    saveFollows(state, { payload: { follows }}) {
      return { ...state, follows };
    },
  },

};

