import React from 'react';
import { Router, Route } from 'dva/router';
import Show from './routes/Show/Show';
import Activity from './routes/Activity/Activity';
import Forum from './routes/Forum/Forum';
import UserPage from './routes/UserPage/UserPage';
import IndexPage from './routes/IndexPage';
import ShowInfo from './routes/Show/ShowInfo';
import UserFollow from './routes/UserPage/UserFollow/UserFollow';

function RouterConfig({ hashHistory }) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IndexPage} />
      <Route path="/Show" component={Show} />
      <Route path="/ShowInfo" component={ShowInfo} />
      <Route path="/Activity" component={Activity} />
      <Route path="/Forum" component={Forum} />
      <Route path="/UserPage" component={UserPage} />
      <Route path="/UserFollow" component={UserFollow} />
    </Router>
  );
}

export default RouterConfig;
