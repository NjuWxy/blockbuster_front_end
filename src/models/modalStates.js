/**
 * Created by john on 2017/12/3.
 */

export default {

  namespace: 'modalStates',

  state: {
    showLogin: false,
    showPostPhoto: false,
    isLoginForm: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *showLogin({ payload: { showLogin } }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'saveShowLogin',
        payload: { showLogin }
      });
    },
    *showPostPhoto({ payload: { showPostPhoto } }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'saveShowPostPhoto',
        payload: { showPostPhoto }
      });
    },
    *isLoginForm({ payload: { isLoginForm } }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'saveIsLoginForm',
        payload: { isLoginForm }
      });
    },
  },

  reducers: {
    saveShowLogin(state, { payload: { showLogin } }) {
      return { ...state, showLogin };
    },
    saveShowPostPhoto(state, { payload: { showPostPhoto } }) {
      return { ...state, showPostPhoto };
    },
    saveIsLoginForm(state, { payload: { isLoginForm } }) {
      return { ...state, isLoginForm };
    }
  },

};
