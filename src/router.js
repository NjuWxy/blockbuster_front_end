import React from 'react';
import { Router, Route } from 'dva/router';
import Show from './routes/Show/Show';
import Activity from './routes/Activity/Activity';
import Forum from './routes/Forum/Forum';
import IndexPage from './routes/IndexPage';
import ShowInfo from './routes/Show/ShowInfo';
import UserFollow from './routes/UserPage/UserFollow/UserFollow';
import UserShow from './routes/UserPage/UserShow/UserShow';
import UserAlbum from './routes/UserPage/UserAlbum/UserAlbum';
import PostPhoto from './routes/PostPhoto/PostPhoto';


function RouterConfig({ hashHistory }) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/Show" component={Show} />
      <Route path="/FollowShow" component={Show} />
      <Route path="/UserShow" component={UserShow} />
      <Route path="/ShowInfo" component={ShowInfo} />
      <Route path="/PostPhoto" component={PostPhoto} />
      <Route path="/Activity" component={Activity} />
      <Route path="/Forum" component={Forum} />
      <Route path="/UserFollow" component={UserFollow} />
      <Route path="/UserAlbum" component={UserAlbum} />
    </Router>
  );
}

export default RouterConfig;
