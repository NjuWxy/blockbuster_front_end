/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Icon } from 'antd';
import styles from './UserSpace.css';
import { getWinHeight } from '../../../utils/tools';

class UserSpace extends React.Component{
  render(){
    const winHeight = getWinHeight();
    const userSpaceHeight = winHeight/3;
    return(
      <Row style={{ minHeight: userSpaceHeight }} className={styles.userSpace}>
        <Col offset={11} span={2} style={{ marginTop: userSpaceHeight/3, textAlign: 'center' }}>
          <img className={styles.avatar} src={require('../../../assets/avatar/avatar.jpg')} />
        </Col>
        <Col offset={11} span={2} className={styles.namePart}>
          <div className={styles.username}>shea</div>
        </Col>
        <Col offset={9} span={6} className={styles.notePart}>
          <div className={styles.note}>只要有一双发现美的眼睛，生活中处处有惊喜<Icon type="edit" className={styles.edit} /></div>
          <Button className={styles.post}>发布</Button>
        </Col>
      </Row>
    )
  }
}

export default connect()(UserSpace);
