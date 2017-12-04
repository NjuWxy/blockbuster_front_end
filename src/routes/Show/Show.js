/**
 * Created by john on 2017/10/27.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Menu } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './Show.css';
import ImageCard from '../../components/Image/ImageCard';

class Show extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <Row className={styles.top}>
          <Col offset={11} span={3}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={['hot']}
              mode="horizontal"
              className={styles.category}
            >
              <Menu.Item key="hot" className={styles.menuItem}>热门</Menu.Item>
              <Menu.Item key="follow" className={styles.menuItem}>关注</Menu.Item>
            </Menu>
          </Col>
        </Row>
        <div className={styles.imagePart}>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>
          <ImageCard/>

        </div>
      </MainLayout>
    )
  }
}

export default connect()(Show);
