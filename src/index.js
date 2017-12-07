import dva from 'dva';
import hashHistory from 'dva/router';
import 'antd/dist/antd.less';
import './index.css';

// 1. Initialize
// 1. Initialize
const app = dva({
  history: hashHistory,
  // onError(e){
  //
  // }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/users'));
app.model(require('./models/show'));
app.model(require('./models/modalStates'));
app.model(require('./models/follows'));

// 4. Router
app.router(require('./router'));


// 5. Start
app.start('#root');
