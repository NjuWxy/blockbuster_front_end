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
import Login from './routes/Login/Login';
import ChangePassword from './routes/ChangePassword/ChangePassword';
import VisitedUserShow from './routes/VisitedUserShow/VisitedUserShow';
import UserMessage from './routes/UserPage/UserMessage/UserMessage';


function RouterConfig({ hashHistory }) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/Show" component={Show} />
      <Route path="/FollowShow" component={Show} />
      <Route path="/SearchShow" component={Show} />
      <Route path="/UserShow" component={UserShow} />
      <Route path="/VisitedUserShow" component={VisitedUserShow} />
      <Route path="/ShowInfo" component={ShowInfo} />
      <Route path="/PostPhoto" component={PostPhoto} />
      <Route path="/Activity" component={Activity} />
      <Route path="/Forum" component={Forum} />
      <Route path="/UserFollow" component={UserFollow} />
      <Route path="/UserAlbum" component={UserAlbum} />
      <Route path="/UserMessage" component={UserMessage} />
      <Route path="/Login" component={Login} />
      <Route path="/ChangePassword" component={ChangePassword} />
    </Router>
  );
}

export default RouterConfig;
