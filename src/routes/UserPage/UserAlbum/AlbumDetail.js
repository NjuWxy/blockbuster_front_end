/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Icon, message } from 'antd';
import styles from './AlbumDetail.css';
import { getWinHeight } from '../../../utils/tools';

class AlbumDetail extends React.Component {

  state = {
    pictureIndex: 0
  };

  goBack = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  lastPhoto = () => {
    let pictureIndex = this.state.pictureIndex;
    if(pictureIndex === 0){
      message.info("没有上一张了");
    }else {
      this.setState({
        pictureIndex: pictureIndex-1
      })
    }
  };

  nextPhoto = () => {
    let pictureIndex = this.state.pictureIndex;
    if(pictureIndex === this.props.detail.photos.length-1){
      message.info("没有下一张了");
    }else {
      this.setState({
        pictureIndex: pictureIndex+1
      })
    }
  };

  render() {
    const minHeight = getWinHeight();
    const picHeight = minHeight*2/3;
    const detail = this.props.detail;
    const presentPicture = detail.photos[this.state.pictureIndex];
    return(
      <Row className={styles.content} style={{minHeight: minHeight, paddingTop: minHeight/12}}>
        <Col offset={2} span={20}>
          <div className={styles.top}>
            <Icon className={styles.close} type="close" onClick={this.goBack}/>
          </div>
          <Row style={{minHeight: picHeight,marginTop: minHeight/16}}>
            <Col span={2}>
              <Icon className={styles.left} style={{marginTop: picHeight/2-50}} type="left" onClick={this.lastPhoto}/>
            </Col>
            <Col span={20} style={{textAlign: 'center'}}>
              <img style={{height: picHeight, width: 'auto'}} src={presentPicture}/>
            </Col>
            <Col span={2}>
              <Icon className={styles.right} style={{marginTop: picHeight/2-50}} type="right" onClick={this.nextPhoto} />
            </Col>
          </Row>
          <Row style={{marginTop: minHeight/40}}>
            <Col offset={11} span={2} className={styles.picIndex}>
              {this.state.pictureIndex+1}/{detail.photos.length}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.user;
  return { detail };
}

export default connect(mapStateToProps)(AlbumDetail);

