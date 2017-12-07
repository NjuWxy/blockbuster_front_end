/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { Row, Col, Menu } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Nav.css';

function Nav ({ dispatch, location }){
  function handleClick(e){
    console.log(e.key);
    dispatch(routerRedux.push({
      pathname: `/${e.key}`
    }));
  }
  return(
    <Row className={styles.top}>
      <Col offset={7} span={10} className={styles.nav}>
        <Menu
          onClick={handleClick}
          selectedKeys={[location.pathname.substring(1)]}
          mode="horizontal"
          className={styles.category}
        >
          <Menu.Item key="UserPage" className={styles.menuItem}>我的主页</Menu.Item>
          <Menu.Item key="UserAlbum" className={styles.menuItem}>我的相册</Menu.Item>
          <Menu.Item key="UserFollow" className={styles.menuItem}>我的关注</Menu.Item>
          <Menu.Item key="UserMessage" className={styles.menuItem}>我的消息</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {

}

export default connect()(Nav);
