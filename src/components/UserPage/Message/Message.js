import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Avatar } from 'antd';
import styles from './Message.css';

function Message({ dispatch,detail }) {
  function handleVisit() {
    dispatch(routerRedux.push({
      pathname: '/VisitedUserShow',
      query:{
        email: detail.email,
      }
    }));
  }

  return(
    <div className={styles.content}>
      <Avatar className={styles.avatar} src={detail.avatar} />
      <div className={styles.message} onClick={handleVisit.bind(this)}>
        <span className={styles.messageMaker}>@{detail.username}</span>
        <span className={styles.text}>{detail.text}</span>
        <span className={styles.date}>{detail.formatDate}</span>
      </div>

    </div>
  )
}

export default connect()(Message);
