/**
 * Created by john on 2017/11/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Avatar, Row, Col, Button } from 'antd';
import styles from './ImageCard.css';
import Tag from '../../components/Tag/Tag';

class ImageCard extends React.Component {
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
      showID: '2764',
    }))
  };
  /**
   * 用户给该条大片儿秀点赞
   */
  handleLike = () => {

  };
  render()  {
    console.log(this.props.show);
    const likeNum = this.props.show.likeNum;
    const isLiked = this.props.show.isLiked;
    const tags = this.props.show.tags;
    const pictures = this.props.show.pictures;
    const date = this.props.show.date;
    const description = this.props.show.description;
    const picNum = pictures.length;
    const cover =pictures[0];

    console.log(cover);
    return (
      <div className={styles.card} onClick={this.toShowInfo}>
        <div
          className={styles.custom_image}
          onMouseEnter={this.showDescription}
          onMouseLeave={this.hideDescription}
        >
          <img alt="example" src={cover} />
          <div className={this.state.descriptionPartState}>
            <div className={styles.title}>胶片第一次试机</div>
            <p>{description}</p>
            <div className={styles.tagPart}>
              {
                tags.map((tag,index) => {
                  return(
                    <span className={styles.tag} key={index}>#{tag}</span>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.interactPart}>
          <img className={styles.forward} src={require('../../assets/forward.svg')} />
          <div className={styles.number}>3445</div>
          <img className={styles.comments} src={require('../../assets/comment.svg')} />
          <div className={styles.number}>289</div>
          <img className={styles.likes} src={require('../../assets/like.svg')} onClick={this.handleLike}/>
          <div className={styles.number}>{likeNum}</div>
          <div className={styles.picNum}>共{picNum}张</div>
          <img className={styles.pictures} src={require('../../assets/pictures.svg')} />
        </div>
        <div className={styles.publisherPart}>
          <Avatar className={styles.avatar} src={require('../../assets/avatar/avatar.jpg')} />
          <div className={styles.info}>
            <div className={styles.nickname}>Shea_Wong<span className={styles.time}>{date}</span></div>
            <div className={styles.from}>来自专辑《女神》</div>
          </div>
          <div className={styles.follow}>+关注</div>
        </div>
      </div>
    )
  }
}



export default connect()(ImageCard);
