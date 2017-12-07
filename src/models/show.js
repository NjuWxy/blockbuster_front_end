/**
 * Created by john on 2017/11/9.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { success, failure } from '../utils/constants';

/**
 * 大片儿秀
 */
import * as showService from '../services/showService';

export default {

  namespace: 'show',

  state: {
    hotTags: [],
    hotShow: [],

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname })=> {
        if(pathname === '/Show') {
          dispatch({
            type:'getHotShow',
            payload: { page: 0}
          });
        }
      });
    },
  },

  effects: {
    *getHotTags({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(showService.getHotTags);
      yield put({
        type: 'saveHotTags',
        payload: { hotTags: result }
      });
    },

    *postPhoto({ payload: { fileNames, title, description, tags, albumId, email} }, { call,put }) {
      const postResult = yield call(showService.postPhoto,fileNames, title, description, tags, albumId, email);
      if(postResult === success){
        yield put(routerRedux.push({
          pathname: '/Show'
        }));
      }else if(postResult === failure ){
        message.error("发布失败")
      }
    },

    * getHotShow({payload:{page=0}},{call,put}){
      const hotShow = yield call(showService.getHotShow,page);
      yield put({
        type: 'saveHotShow',
        payload:{ hotShow },
      })
    }
  },

  reducers: {
    saveHotTags(state, { payload: { hotTags }}) {
      return { ...state, hotTags };
    },
    saveHotShow(state, { payload: { hotShow }}) {
      return { ...state, hotShow };
    }
  },

};
