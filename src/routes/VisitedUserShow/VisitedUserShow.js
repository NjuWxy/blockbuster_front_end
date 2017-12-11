/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Avatar, Icon, message } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './VisitedUserShow.css';
import ShowCard from '../../components/UserPage/Card/ShowCard/ShowCard';
import { isLogin } from '../../utils/userHelper';
import { getWinHeight } from '../../utils/tools';


class UserShow extends React.Component {
  handleFollow = () => {
    if(!isLogin()){
      message.error("您还没有登陆哦！");
      return;
    }else {
      this.props.dispatch({
        type: `follow/${this.props.isFollowed?'cancelFollowUser':'followUser'}`,
        payload: {
          followedEmail: this.props.visitedUser.email,
          sid: '',
          pathname: this.props.location.pathname
        }
      });
    }
  };
  render() {
    let { show, location, visitedUser, isFollowed } = this.props;
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let column4 = [];
    for(let i=0;i<show.length;i++){
      if(i%4 === 0){
        column1.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else if(i%4 === 1){
        column2.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else if(i%4 === 2){
        column3.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else {
        column4.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }
    }
    const winHeight = getWinHeight();
    const userSpaceHeight = winHeight/3;
    let followText = isFollowed?'取消关注':'关注';
    return (
      <MainLayout location={this.props.location}>
        <Row style={{ minHeight: userSpaceHeight }} className={styles.userSpace}>
          <Col offset={11} span={2} style={{ marginTop: userSpaceHeight/3, textAlign: 'center' }}>
            <Avatar className={styles.avatar} src={visitedUser.avatar} />
          </Col>
          <Col offset={11} span={2} className={styles.namePart}>
            <div className={styles.username}>{visitedUser.username}</div>
          </Col>
          <Col offset={9} span={6} className={styles.notePart}>
            <div className={styles.note}>只要有一双发现美的眼睛，生活中处处有惊喜</div>
            <Button className={styles.follow} onClick={this.handleFollow}>{followText}</Button>
          </Col>
        </Row>
        <Row className={styles.content}>
          <Col offset={2} span={20}>
            <Row type="flex" justify="space-between" align="top">
              <Col span={24}>
                <Row type="flex" justify="space-between" align="top" >
                  <Col span={6}>
                    {column1}
                  </Col>
                  <Col span={6}>
                    {column2}
                  </Col>
                  <Col span={6}>
                    {column3}
                  </Col>
                  <Col span={6}>
                    {column4}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { show,visitedUser, isFollowed } = state.show;
  return { show, visitedUser, isFollowed };
}


export default connect(mapStateToProps)(UserShow);


