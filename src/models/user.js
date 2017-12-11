/**
 * Created by john on 2017/10/27.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as userService from '../services/userService';
import * as albumService from '../services/albumService';
import { success,failure } from '../utils/constants';
import { saveUser, removeUser, saveAvatar } from '../utils/userHelper';

/**
 * 登陆退出、存储相册
 */
export default {
  namespace: 'user',
  state: {
    //本用户的头像
    albums: [],
    avatar: window.sessionStorage.getItem("avatar"),
    albumDetail: {
      aid: '',
      title: '',
      email: '',
      photos: [],
    },
    // hasNewMessage: false,
    messages: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname })=> {
        if(pathname === '/UserAlbum' || pathname === '/PostPhoto') {
          dispatch({
            type: 'getAlbums',
          })
        }else if(pathname === '/UserMessage'){
          dispatch({
            type: 'getMessage',
          })
        }
      });
    }
  },

  effects: {
    * signUp({ payload: {username,email,password} }, { call, put }) {
      const signUpResult = yield call(userService.signUp,username,email,password);
      //注册成功
      if(signUpResult === success){
        const loginResult = yield call(userService.login,email,password);
        //登陆成功并且注册成功
        if(loginResult !== failure){
          yield put({
            type: 'saveAvatar',
            payload: { avatar: loginResult.avatar },
          });
          saveUser(loginResult.email, loginResult.username, loginResult.avatar);
          yield put(routerRedux.goBack());
        }else {
          message.error("登陆失败");
        }
      }else {
        message.error("注册失败");
      }
    },

    * login({payload: {email,password}},{call,put}){
      const loginResult = yield call(userService.login, email,password);
      //如果登陆成功
      if(loginResult !== failure){
        yield put({
          type: 'saveAvatar',
          payload: { avatar: loginResult.avatar },
        });
        saveUser(loginResult.email, loginResult.username, loginResult.avatar);
        yield put(routerRedux.goBack());
      }else {
        message.error("登陆失败，请检查用户名或者密码是否正确");
      }
    },

    * logout({payload},{put}){
      removeUser();
      yield put(routerRedux.push({
        pathname: '/Show',
      }))
    },

    * changePassword({ payload: { oldPassword, newPassword }}, { call,put }) {
      const result = yield call(userService.changePassword,oldPassword,newPassword);
      if(result === success ){
        message.success("修改密码成功");
        yield put(routerRedux.goBack());
      }else {
        message.error("修改密码失败，请检查原密码是否正确");
      }
    },

    * postAvatar({ payload: { fileName, pathname }}, { call, put }) {
      const result = yield call(userService.postAvatar,fileName);
      if(result === failure ){
        message.error("更新头像失败");
      }else {
        message.success("更新头像成功");
        saveAvatar(result);
        yield put({
          type: 'saveAvatar',
          payload: { avatar: result },
        });
        yield put(routerRedux.push({
          pathname
        }));
      }
    },

    // *getUserInfo({ payload: { email }},{ call, put }){
    //   const result = yield call(userService.getUserInfo,email);
    //   yield put({
    //     type: 'saveUserInfo',
    //     payload: { userInfo: result },
    //   })
    // },

    * getAlbums({payload},{call,put}){
      const albums = yield call(albumService.getAlbums);
      console.log("user/getAlbums:");
      console.log(albums);
      yield put({
        type: 'saveAlbums',
        payload: { albums }
      });
    },

    * createAlbum({ payload: { album }},{ call, put }){
      const createResult = yield call(albumService.createAlbum, album);
      if(createResult === failure){
        message.error("创建新专辑失败") ;
      }else {
        yield put(routerRedux.push({
          pathname: '/UserAlbum'
        }));
      }
    },

    * deleteAlbum({ payload: { aid }}, { call,put }) {
      const result = yield call(albumService.deleteAlbum, aid);
      if(result !== success){
        message.error("删除相册失败");
      }else {
        yield put(routerRedux.push({
          pathname: '/UserAlbum'
        }))
      }
    },
    * getAlbumDetail({ payload: { aid }}, {call,put}) {
      const detail = yield call(albumService.getAlbumDetail, aid);
      yield put(
        {
          type: 'saveDetail',
          payload: { albumDetail:detail },
        }
      );
    },
    * getMessage({ payload }, {call, put}) {
      const messages = yield call(userService.getMessage);
      yield put({
        type: 'saveMessage',
        payload: { messages }
      })
    },
    // * getHasNewMessage({ payload }, {call, put}) {
    //   const hasNewMessage = yield call(userService.getHasNewMessage);
    //   yield put({
    //     type: 'saveHasNewMessage',
    //     payload: { hasNewMessage }
    //   })
    // }

  },

  reducers: {
    saveAlbums(state, { payload: { albums }}){
      return { ...state, albums};
    },
    saveDetail(state, { payload: { albumDetail }}) {
      return{ ...state, albumDetail };
    },
    saveAvatar(state, { payload: { avatar }}) {
      return{ ...state, avatar };
    },
    saveMessage(state, { payload: { messages }}) {
      return{ ...state, messages };
    },
    // saveHasNewMessage(state, { payload: { hasNewMessage }}) {
    //   return{ ...state, hasNewMessage };
    // },

  }
};
