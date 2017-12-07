/**
 * Created by john on 2017/12/6.
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
      <Col offset={11} span={3}>
        <Menu
          onClick={handleClick}
          selectedKeys={[location.pathname.substring(1)]}
          mode="horizontal"
          className={styles.category}
        >
          <Menu.Item key="Show" className={styles.menuItem}>热门</Menu.Item>
          <Menu.Item key="FollowShow" className={styles.menuItem}>关注</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {

}

export default connect()(Nav);

