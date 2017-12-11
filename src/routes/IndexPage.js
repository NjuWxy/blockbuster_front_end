import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row,Col,Input, Button } from 'antd';
import styles from './IndexPage.css';
import { getWinHeight } from '../utils/tools';



function IndexPage({dispatch}) {
  function check() {
    dispatch(routerRedux.push({
      pathname: "/Show",
    }))
  }
  function join() {
    dispatch(routerRedux.push({
      pathname: "/Login",
    }))
  }
  function handleSearch(e) {
    const key = e.target.value;
    dispatch(routerRedux.push({
      pathname: '/SearchShow',
      query: { key }
    }))
  }
  return (
    <div style={{minHeight: getWinHeight()}} className={styles.container}>
      <img src={require('../assets/back.jpg')}/>
      <div className={styles.content}>
        <Row>
          <Col offset={8} span={8} style={{textAlign:'center'}}>
            <div className={styles.cameraContainer}>
              <img src={require('../assets/camera.svg')} />
            </div>
            <div className={styles.title}>大片儿</div>
            <div className={styles.separator} />
            <div className={styles.subtitle}><span>源于摄影，</span><span>高于摄影</span></div>
            <Input className={styles.input} placeholder="搜索你想要的作品" onPressEnter={handleSearch.bind(this)}/>
            <Button className={styles.join} onClick={join.bind(this)}>加入我们</Button>
            <Button className={styles.check} onClick={check.bind(this)}>先去看看</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
