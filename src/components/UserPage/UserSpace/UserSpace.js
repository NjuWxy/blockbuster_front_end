/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Icon, Avatar, message } from 'antd';
import styles from './UserSpace.css';
import { getWinHeight } from '../../../utils/tools';
import { getUsername, getUserAvatar,isLogin } from '../../../utils/userHelper';

class UserSpace extends React.Component{
  handlePost = () => {
    if(!isLogin()){
      message.error("请先登陆");
    }else {
      this.props.dispatch(routerRedux.push({
        pathname: '/PostPhoto',
      }))
    }
  };

  render(){
    const winHeight = getWinHeight();
    const userSpaceHeight = winHeight/3;
    return(
      <Row style={{ minHeight: userSpaceHeight }} className={styles.userSpace}>
        <Col offset={11} span={2} style={{ marginTop: userSpaceHeight/3, textAlign: 'center' }}>
          <Avatar className={styles.avatar} src={getUserAvatar()} />
        </Col>
        <Col offset={11} span={2} className={styles.namePart}>
          <div className={styles.username}>{getUsername()}<Icon type="lock" style={{marginLeft: 10}} /></div>
        </Col>
        <Col offset={9} span={6} className={styles.notePart}>
          <div className={styles.note}>只要有一双发现美的眼睛，生活中处处有惊喜</div>
          <Button className={styles.post} onClick={this.handlePost}>发布</Button>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { showPostPhoto } = state.modalStates;
  return { showPostPhoto };
}

export default connect(mapStateToProps)(UserSpace);
