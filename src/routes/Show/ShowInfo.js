/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar } from 'antd';
import ImageGallery from 'react-image-gallery';
// import ImageGallery from '../../components/ImageGallery/ImageGallery';
import MainLayout from '../../components/MainLayout/MainLayout';
import ImagePreview from '../../components/Image/ImagePreview';
import styles from './ShowInfo.less';




class ShowInfo extends React.Component {
  render() {
    const images = [
      {
        original: require('../../assets/cat.jpg'),
        thumbnail: require('../../assets/cat.jpg'),
      },
      {
        original: require('../../assets/avatar/qingzi.jpg'),
        thumbnail: require('../../assets/avatar/qingzi.jpg'),
      },
      {
        original: require('../../assets/avatar/huge.jpg'),
        thumbnail: require('../../assets/avatar/huge.jpg'),
      }
    ];
    return(
      <Row>
        <Col offset={1} span={22}>
          <Row>
            <Col span={18}>
              <ImagePreview />
            </Col>
            <Col span={6}>
              <div className={styles.publisherPart}>
                <Avatar className={styles.avatar} src={require('../../assets/avatar/avatar.jpg')} />
                <div className={styles.info}>
                  <div className={styles.nickname}>Shea_Wong<span className={styles.time}>2017-09-17</span></div>
                  <div className={styles.from}>来自专辑《女神》</div>
                </div>
                <div className={styles.follow}>+关注</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default connect()(ShowInfo);
