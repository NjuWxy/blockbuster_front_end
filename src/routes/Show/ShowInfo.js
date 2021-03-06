/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Icon, Button, message, Avatar } from 'antd';
import styles from './ShowInfo.less';
import { getWinHeight } from '../../utils/tools';
import { showFollowButton, isLogin, isSelf } from '../../utils/userHelper';

class ShowInfo extends React.Component {

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
    if(pictureIndex === this.props.detail.pictures.length-1){
      message.info("没有下一张了");
    }else {
      this.setState({
        pictureIndex: pictureIndex+1
      })
    }
  };

  handleLike = () => {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }else {
      this.props.dispatch({
        type: `show/${this.props.detail.isLiked?'cancelLikeShow':'likeShow'}`,
        payload: {
          sid: this.props.detail.sid,
          pathname: this.props.location.pathname
        }
      });
    }
  };

  render() {
    const minHeight = getWinHeight();
    const picHeight = minHeight*2/3;
    const detail = this.props.detail;
    console.log(detail.description.length);
    let likeType = detail.isLiked?'heart':'heart-o';
    const presentPicture = detail.pictures[this.state.pictureIndex];
    return(
      <Row className={styles.content} style={{minHeight: minHeight, paddingTop: minHeight/12}}>
        <Col offset={2} span={20}>
          <div className={styles.top}>
            <Icon className={styles.close} type="close" onClick={this.goBack}/>
            <Icon className={styles.like} type={likeType} onClick={this.handleLike} />
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
              {this.state.pictureIndex+1}/{detail.pictures.length}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.show;
  return { detail };
}

export default connect(mapStateToProps)(ShowInfo);
