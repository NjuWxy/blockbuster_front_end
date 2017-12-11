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
        pictureIndex: pictureIndex-1
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

  handleVisit = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/VisitedUserShow',
      query:{
        email: this.props.detail.email,
      }
    }))
  };

  handleFollow = () => {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }else {
      this.props.dispatch({
        type: `follow/${this.props.detail.followed?'cancelFollowUser':'followUser'}`,
        payload: {
          followedEmail: this.props.detail.email,
          sid: this.props.detail.sid,
          pathname: this.props.location.pathname
        }
      });
    }
  };

  render() {
    const minHeight = getWinHeight();
    const picHeight = minHeight*5/9;
    const detail = this.props.detail;
    let followText = detail.followed?'取消关注':'关注';
    let likeType = detail.isLiked?'heart':'heart-o';
    const presentPicture = detail.pictures[this.state.pictureIndex];
    let usernameStyle = isSelf(detail.email)?styles.username:styles.visitedName;
    return(
      <Row className={styles.content} style={{minHeight: minHeight}}>
        <Col offset={2} span={20}>
          <div className={styles.top}>
            <Avatar className={styles.avatar} src={detail.avatar} />
            <div className={styles.user}>
              <div>
                <span className={usernameStyle} onClick={this.handleVisit}>{detail.userName}</span>
                {
                  showFollowButton(detail.email) ?
                    <span><Button className={styles.follow} onClick={this.handleFollow}>{followText}</Button></span>
                    :
                    null
                }
              </div>
              <div className={styles.time}>发布时间：{this.props.detail.formatDate}</div>
            </div>
            <Icon className={styles.close} type="close" onClick={this.goBack}/>
            <Icon className={styles.download} type="download" />
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
          <div className={styles.descriptionPart}  style={{marginTop: minHeight/25}}>
            <h1 className={styles.title}>{detail.title}</h1>
            <p className={styles.description}>{detail.description}</p>
            <div className={styles.tags}>
              {
                detail.tags.map((tag, index) => {
                  return <span className={styles.tag} key={index}>#{tag}</span>
                })
              }
            </div>
          </div>
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
