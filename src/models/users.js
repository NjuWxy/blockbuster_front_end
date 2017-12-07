/**
 * Created by john on 2017/10/27.
 */
import { message } from 'antd';
import * as userService from '../services/userService';
import { success,failure } from '../utils/constants';

export default {
  namespace: 'users',
  state: {
    isLogin: false,
    user: {},
    albums: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname })=> {
        if(pathname === '/UserPage') {

        }
      });
    }
  },

  effects: {
    * signUp({ payload: {username,email,password} }, { call, put }) {
      console.log(username+"   "+email+"   "+password);
      const signUpResult = yield call(userService.signUp,username,email,password);
      //注册成功
      if(signUpResult === success){
        const loginResult = yield call(userService.login,email,password);
        //登陆成功并且注册成功
        if(loginResult !== failure){
          window.sessionStorage.setItem("email",email);
          //记录已登陆
          yield put({
            type: 'saveIsLogin',
            payload:{isLogin:true},
          });
          //保存user信息
          yield put({
            type: 'saveUser',
            payload: {
              user: loginResult
            }
          });
        }
      }else {
        message.error("注册失败");
      }
    },

    * login({payload: {email,password}},{call,put}){
      const loginResult = yield call(userService.login, email,password);
      //如果登陆成功
      if(loginResult !== failure){
        window.sessionStorage.setItem("email",email);
        //记录已登陆
        yield put({
          type: 'saveIsLogin',
          payload:{isLogin:true},
        });
        //保存user信息
        yield put({
          type: 'saveUser',
          payload: {
            user: loginResult
          }
        });
      }else {
        message.error("登陆失败，请检查用户名或者密码是否正确");
      }
    },

    * logout({payload},{put}){
      //删除用户信息
      yield put({
        type: 'saveUser',
        payload: {
          user: {}
        }
      });
      window.sessionStorage.removeItem("email");
      //记录未登陆
      yield put({
        type: 'saveIsLogin',
        payload:{isLogin:false},
      });
    },

    * signOut({payload}, {call,put}){
      const signOutResult = yield call(userService.signOut);
      if(signOutResult === success){
        //删除用户信息
        yield put({
          type: 'saveUser',
          payload: {
            user: {}
          }
        });
        window.sessionStorage.removeItem("email");
        //记录未登陆
        yield put({
          type: 'saveIsLogin',
          payload:{isLogin:false},
        });
      }else {
        message.error("注销失败");
      }
    },

    * getAlbums({payload},{call,put}){
      const albums = yield call(userService.getAlbums);
      yield put({
        type: 'saveAlbums',
        payload: { albums }
      });
    },

    * createAlbum({ payload: { album }},{ call }){
      const createResult = yield call(userService.createAlbum, album);
      if(createResult === failure){
        message.error("创建新专辑失败") ;
      }
    },

    * updateAlbums({ payload: { albums }}, { put }) {
      yield put({
        type: 'saveAlbums',
        payload: { albums }
      });
    }

  },

  reducers: {
    saveUser(state, { payload: { user }}) {
      return { ...state, user };
    },
    saveIsLogin(state, { payload: { isLogin }}){
      return { ...state, isLogin };
    },
    saveAlbums(state, { payload: { albums }}){
      return { ...state, albums};
    }
  }
};
