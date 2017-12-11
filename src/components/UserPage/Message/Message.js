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
    <div className={styles.message}>
      <Avatar className={styles.avatar} src={detail.avatar} />
      <div className={styles.messageMaker} onClick={handleVisit.bind(this)}>@{detail.username}</div>
      <div className={styles.text}>{detail.text}</div>
      <div className={styles.date}>{detail.formatDate}</div>
    </div>
  )
}

export default connect()(Message);
