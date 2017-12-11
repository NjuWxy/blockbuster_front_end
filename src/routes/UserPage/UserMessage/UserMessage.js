/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Avatar, Tabs } from 'antd';
import MainLayout from '../../../components/MainLayout/MainLayout';
import styles from './UserMessage.css';
import UserSpace from '../../../components/UserPage/UserSpace/UserSpace';
import Nav from '../../../components/UserPage/Nav/Nav';
import Message from '../../../components/UserPage/Message/Message';

const TabPane = Tabs.TabPane;



class UserMessage extends React.Component {

  render() {
    return (
      <MainLayout location={this.props.location}>
        <UserSpace location={this.props.location} />
        <Nav location={this.props.location}/>
        <Row>
          <Col span={14} offset={5} className={styles.content}>
            <Tabs defaultActiveKey="New" tabPosition="left">
              <TabPane tab="未读消息" key="New" style={{marginLeft: 80}}>
                {
                  this.props.newMessages.map((message,index) => {
                    return <Message key={index} detail={message} />
                  })
                }
              </TabPane>
              <TabPane tab="已读消息" key="Old" style={{marginLeft: 80}}>
                {
                  this.props.oldMessages.map((message,index) => {
                    return <Message key={index} detail={message} />
                  })
                }
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { messages } = state.user;
  let newMessages = [];
  let oldMessages = [];
  messages.map((message) => {
    if(message.flag){
      oldMessages.push(message);
    }else {
      newMessages.push(message);
    }
  });
  return { newMessages, oldMessages };
}


export default connect(mapStateToProps)(UserMessage);

