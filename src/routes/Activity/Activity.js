/**
 * Created by john on 2017/10/28.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Avatar, Icon } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';

class Activity extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <div>Activity</div>
      </MainLayout>
    )
    // return (
    //   <MainLayout location={this.props.location}>
    //     <div>activity</div>
    //     <Row style={{paddingTop: 10}}>
    //       <Col span={6} style={{textAlign: 'center'}}>
    //         <Icon style={{fontSize: 32, color: '#b4b4b4'}} type="team" />
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>粉丝</div>
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>1397</div>
    //       </Col>
    //       <Col span={6} style={{textAlign: 'center'}}>
    //         <Icon style={{fontSize: 32, color: '#b4b4b4'}} type="heart-o" />
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>关注</div>
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>397</div>
    //       </Col>
    //       <Col span={6} style={{textAlign: 'center'}}>
    //         <Icon style={{fontSize: 32, color: '#b4b4b4'}} type="camera-o" />
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>动态</div>
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>8956</div>
    //       </Col>
    //       <Col span={6} style={{textAlign: 'center'}}>
    //         <Icon style={{fontSize: 32, color: '#b4b4b4'}} type="calendar" />
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>积分</div>
    //         <div style={{fontSize: 12, color:'#b4b4b4'}}>1397</div>
    //       </Col>
    //     </Row>
    //     <Row style={{paddingTop: 10}}>
    //       <Col span={8} style={{textAlign: 'center'}}>
    //         <div style={{fontSize: 14}}>推荐关注</div>
    //       </Col>
    //     </Row>
    //     <Row style={{paddingTop: 10}}>
    //       <Col span={8} style={{textAlign: 'center'}}>
    //         <Avatar src={require('../../assets/avatar/qingzi.jpg')} className={styles.avatarSquare} />
    //         <div>阚清子</div>
    //       </Col>
    //       <Col span={8} style={{textAlign: 'center'}}>
    //         <Avatar src={require('../../assets/avatar/jilingchen.jpg')} className={styles.avatarSquare} />
    //         <div>纪凌尘</div>
    //       </Col>
    //       <Col span={8} style={{textAlign: 'center'}}>
    //         <Avatar src={require('../../assets/avatar/huge.jpg')} className={styles.avatarSquare} />
    //         <div>胡歌</div>
    //       </Col>
    //     </Row>
    //   </MainLayout>
    // )
  }
}

export default connect()(Activity);
