/**
 * Created by john on 2017/11/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { message, Avatar, Row, Col, Button } from 'antd';
import styles from './ShowCard.css';
import { isLogin, showFollowButton } from '../../../utils/userHelper';


class ShowCard extends React.Component {
  state={
    descriptionPartState: styles.hideDescriptionPart,
  };
  showDescription = () => {
    this.setState({
      descriptionPartState: styles.showDescriptionPart,
    });
  };
  hideDescription = () => {
    this.setState({
      descriptionPartState: styles.hideDescriptionPart,
    });
  };
  toShowInfo = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/ShowInfo',
      query:  {
        sid: this.props.detail.sid,
      }
    }))
  };
  /**
   * 用户给该条大片儿秀点赞
   */
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

  render()  {
    const detail = this.props.detail;
    let followText = detail.followed?'取消关注':'关注';
    let likeImg = detail.isLiked?
      <img className={styles.likes} src={require('../../../assets/icon/cancelLike.svg')} onClick={this.handleLike}/>
      :
      <img className={styles.likes} src={require('../../../assets/icon/like.svg')} onClick={this.handleLike}/>;
    return (
      <div className={styles.card}>
        <div
          className={styles.custom_image}
          onMouseEnter={this.showDescription}
          onMouseLeave={this.hideDescription}
        >
          <img alt="example" src={detail.pictures[0]} />
          <div className={this.state.descriptionPartState}  onClick={this.toShowInfo}>
            <div className={styles.title}>{detail.title}</div>
            <p>{detail.description}</p>
            <div className={styles.tagPart}>
              {
                detail.tags.map((tag,index) => {
                  return(
                    <span className={styles.tag} key={index}>#{tag}</span>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.interactPart}>
          <img className={styles.forward} src={require('../../../assets/icon/forward.svg')} />
          <div className={styles.number}>3445</div>
          <img className={styles.comments} src={require('../../../assets/icon/comment.svg')} />
          <div className={styles.number}>289</div>
          {likeImg}
          <div className={styles.number}>{detail.likeNum}</div>
          <div className={styles.picNum}>共{detail.pictures.length}张</div>
          <img className={styles.pictures} src={require('../../../assets/icon/pictures.svg')} />
        </div>
        <div className={styles.publisherPart}>
          <Avatar className={styles.avatar} src={detail.avatar} />
          <div className={styles.info}>
            <div className={styles.nickname}>
              {detail.userName}
              {
                detail.albumName === ''?
                  null
                  :
                  <span className={styles.from}>来自专辑《{detail.albumName}》</span>
              }
            </div>
            <div className={styles.date}>{detail.formatDate}</div>
          </div>
          {
            showFollowButton(detail.email)?
              <div className={styles.follow} onClick={this.handleFollow}>{followText}</div>
              :
              null
          }
        </div>
      </div>
    )
  }
}



export default connect()(ShowCard);
