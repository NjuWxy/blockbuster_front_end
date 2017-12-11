/**
 * Created by john on 2017/11/9.
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { success, failure } from '../utils/constants';

/**
 * 大片儿秀（热门、关注、我的），show的详情、热门标签
 * 点赞和取消点赞、发布大片儿
 */
import * as showService from '../services/showService';
import * as userService from '../services/userService';

export default {

  namespace: 'show',

  state: {
    /**
     * 被访问的user的信息
     */
    visitedUser: {
      email: '',
      username: '',
      avatar:'',
    },
    isFollowed: false,
    hotTags: [],
    show: [],
    detail: {
      sid: '',
      title: '',
      aid: '',
      description: '',
      date: '',
      likeNum: '',
      email: '',
      isLiked: false,
      tags: [],
      pictures: [],
      userName: '',
      avatar: '',
      followed: false,
      formatDate: '',
      albumName: '',
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query })=> {
        if (pathname === '/ShowInfo') {
          dispatch({
            type: 'getDetail',
            payload: {
              sid: query.sid
            }
          })
        }
        if (pathname === '/Show') {
          dispatch({
            type: 'getHotShow',
            payload: {page: 0}
          });
        }else if( pathname === '/FollowShow') {
          dispatch({
            type: 'getCareShows',
          });
        }else if( pathname === '/UserShow') {
          dispatch({
            type: 'getMyShow',
          })
        }else if( pathname === '/SearchShow') {
          dispatch({
            type: 'searchShow',
            payload: { key: query.key },
          });
        }else if( pathname === '/VisitedUserShow') {
          dispatch({
            type: 'getVisitedUserShow',
            payload: { email: query.email },
          })
        }else if( pathname === '/PostPhoto') {
          dispatch({
            type: 'getHotTags',
          })
        }
      });
    },
  },

  effects: {
    *postPhoto({ payload: { fileNames, title, description, tags, albumTitle} }, { call,put }) {
      const postResult = yield call(showService.postPhoto,fileNames, title, description, tags, albumTitle);
      if(postResult === success){
        yield put(routerRedux.push({
          pathname: '/Show'
        }));
      }else if(postResult === failure ){
        message.error("发布失败")
      }
    },

    *getHotTags({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(showService.getHotTags);
      yield put({
        type: 'saveHotTags',
        payload: { hotTags: result }
      });
    },

    * getHotShow({ payload: { page } },{ call, put }){
      const show = yield call(showService.getHotShow,page);
      console.log(show);
      yield put({
        type: 'saveShow',
        payload:{ show },
      })
    },

    * getCareShows({ payload },{ call, put }){
      const show = yield call(showService.getCareShows);
      yield put({
        type: 'saveShow',
        payload:{ show },
      })
    },

    /**
     *用户访问自己的主页
     */
    * getMyShow({ payload },{ call, put }){
      const show = yield call(showService.getMyShow);
      yield put({
        type: 'saveShow',
        payload:{ show },
      })
    },

    /**
     *用户访问别人的主页
     * email: 被访问者的email
     */
    * getVisitedUserShow({ payload: { email }}, { call, put }){
      const show = yield call(showService.getMyShow, email);
      const visitedUser = yield call(userService.getUserInfo, email);
      const isFollowed = yield call(userService.getIsFollowed,email);
      yield put({
        type: 'saveShow',
        payload:{ show },
      });
      yield put({
        type: 'saveVisitedUser',
        payload:{ visitedUser },
      });
      yield put({
        type: 'saveIsFollowed',
        payload:{ isFollowed },
      });
    },

    * searchShow({ payload: { key } },{ call, put }){
      const show = yield call(showService.searchShow, key);
      yield put({
        type: 'saveShow',
        payload:{ show },
      })
    },

    * getDetail({ payload: { sid }},{ call, put }) {
      const detail = yield call(showService.getDetail,sid);
      yield put({
        type: 'saveDetail',
        payload: { detail },
      })
    },

    * likeShow({ payload: { sid, pathname }},{ call, put }) {
      const result = yield call(showService.likeShow,sid);
      if( result === success ){
        yield put(routerRedux.push({
          pathname,
          query: pathname==='/ShowInfo'?{ sid }:{}
        }))
      }else {
        message.error("点赞失败");
      }
    },

    * cancelLikeShow({ payload: { sid, pathname }},{ call, put }) {
      const result = yield call(showService.cancelLikeShow,sid);
      if( result === success ){
        yield put(routerRedux.push({
          pathname,
          query: pathname==='/ShowInfo'?{ sid }:{}
        }))
      }else {
        message.error("取消点赞失败");
      }
    }
  },

  reducers: {
    saveHotTags(state, { payload: { hotTags }}) {
      return { ...state, hotTags };
    },
    saveShow(state, { payload: { show }}) {
      return { ...state, show };
    },
    saveDetail(state, { payload: { detail }}) {
      return { ...state, detail };
    },
    saveVisitedUser(state, { payload: { visitedUser}}) {
      return{ ...state, visitedUser};
    },
    saveIsFollowed(state, { payload: { isFollowed}}) {
      return{ ...state, isFollowed};
    }
  },

};
