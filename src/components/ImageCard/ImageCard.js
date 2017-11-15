/**
 * Created by john on 2017/11/3.
 */
import React from 'react';
import { connect } from 'dva';
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
  render()  {
    return (
      <div className={styles.card}>
        <div
          className={styles.custom_image}
          onMouseEnter={this.showDescription}
          onMouseLeave={this.hideDescription}
        >
          <img alt="example" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <div className={this.state.descriptionPartState}>
            <div className={styles.title}>胶片第一次试机</div>
            <p>今年七月份新入一台佳能eos1v，迫不及待约了小伙伴试机。
              39度高温，拍了好几个小时，换了八身衣服，后来因为不熟悉机器，
              导致五卷胶卷只有三卷成型。好在留下的也算满意。</p>
            <div className={styles.tagPart}>
              <span className={styles.activityTag}>#2017胶片摄影赛</span>
              <span className={styles.tag}>#复古</span>
              <span className={styles.tag}>#老街</span>
              <span className={styles.tag}>#胶片</span>
              <span className={styles.tag}>#人像</span>
              <span className={styles.tag}>#历史</span>
            </div>
          </div>
        </div>
        <div className={styles.interactPart}>
          <img className={styles.forward} src={require('../../assets/forward.svg')} />
          <div className={styles.number}>3445</div>
          <img className={styles.comments} src={require('../../assets/comment.svg')} />
          <div className={styles.number}>289</div>
          <img className={styles.likes} src={require('../../assets/like.svg')} />
          <div className={styles.number}>5376</div>
          <div className={styles.picNum}>共6张</div>
          <img className={styles.pictures} src={require('../../assets/pictures.svg')} />
        </div>
        <div className={styles.publisherPart}>
          <Avatar className={styles.avatar} src={require('../../assets/avatar/avatar.jpg')} />
          <div className={styles.info}>
            <div className={styles.nickname}>Shea_Wong<span className={styles.time}>2017-09-17</span></div>
            <div className={styles.from}>来自专辑《女神》</div>
          </div>
          <div className={styles.follow}>+关注</div>
        </div>
      </div>
    )
  }
}

export default connect()(ImageCard);
