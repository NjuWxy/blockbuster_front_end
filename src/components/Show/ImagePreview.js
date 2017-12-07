import React from 'react';
import { Row, Col } from 'antd';
import styles from './ImagePreview.css';

class ImagePreview extends React.Component {
  render () {
    return (
     <Row className={styles.imgContainer} justify="space-around" align="middle">
       <Col span={24}>
         <img className={styles.img} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
       </Col>
     </Row>
    )
  }
}

export default ImagePreview;
