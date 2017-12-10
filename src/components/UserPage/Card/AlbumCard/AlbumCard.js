/**
 * Created by john on 2017/11/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd';
import styles from './AlbumCard.css';
import { isLogin } from '../../../../utils/userHelper';


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
  toAlbumDetail = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/AlbumDetail',
      query:  {
        aid: this.props.detail.aid,
      }
    }))
  };

  delAlbum = () => {
    this.props.dispatch({
      type: 'user/deleteAlbum',
      payload: {
        aid: this.props.detail.aid,
      }
    })
  };

  render()  {
    const detail = this.props.detail;
    return (
      <div className={styles.card}>
        <div
          className={styles.custom_image}
          onMouseEnter={this.showDescription}
          onMouseLeave={this.hideDescription}
        >
          {
            detail.photos.length === 0?
              <img className={styles.img} src={require('../../../../assets/defaultCover.jpg')} />
              :
              <img className={styles.img} src={detail.photos[0]} onClick={()=>{this.toDetail(album.aid)}} />
          }
          <div className={this.state.descriptionPartState}  onClick={this.toAlbumDetail}>
            <div className={styles.picNum}>共{detail.photos.length}张</div>
            <img className={styles.pictures} src={require('../../../../assets/icon/pictures.svg')} />
          </div>
        </div>
        <div className={styles.interactPart}>
          {
            detail.title === '默认专辑'?
              null
              :
              <Icon className={styles.delete} type="delete" onClick={this.delAlbum} />
          }
          <div className={styles.title}>{detail.title}</div>
        </div>
      </div>
    )
  }
}



export default connect()(ShowCard);

