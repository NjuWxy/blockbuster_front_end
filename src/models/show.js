/**
 * Created by john on 2017/11/9.
 */
/**
 * 大片儿秀
 */
import * as showService from '../services/showService';

export default {

  namespace: 'show',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *postPhoto({ payload: share }, { call }) {
      const result = yield call(showService.postPhoto,share);
      console.log('models/show/postPhoto');
      console.log(result);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
