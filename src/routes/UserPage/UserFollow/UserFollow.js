/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Avatar } from 'antd';
import MainLayout from '../../../components/MainLayout/MainLayout';
import styles from './UserFollow.css';
import UserSpace from '../../../components/UserPage/UserSpace/UserSpace';
import Nav from '../../../components/UserPage/Nav/Nav';


class UserFollow extends React.Component {
  state = {
    selectedKeys: []
  };

  cancelFollow = () => {
    this.props.dispatch({
      type: 'follow/cancelFollowUsers',
      payload: {
        followedEmails: this.state.selectedKeys
      }
    });
  };
  render() {
    const columns = [{
      title: '头像',
      dataIndex: 'avatarUrl',
      render: url => <Avatar className={styles.avatar} src={url} />,
    }, {
      title: '昵称',
      dataIndex: 'username',
    }, {
      title: 'email',
      dataIndex: 'email',
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedKeys: selectedRows.map(row => row.key),
        });
      }
    };
    return (
      <MainLayout location={this.props.location}>
        <UserSpace />
        <Nav location={this.props.location}/>
        <Row className={styles.content}>
          <Col offset={4} span={16}>
            <Button className={styles.cancelFollow} onClick={this.cancelFollow}>取消关注</Button>
          </Col>
        </Row>
        <Row className={styles.tablePart}>
          <Col offset={4} span={16}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.follows} />
          </Col>
        </Row>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { followedUsers } = state.follow;
  let follows = [];
  followedUsers.map((user) => {
    follows.push(
      {key: user.email,
        username: user.username,
        avatarUrl: user.avatar,
        email: user.email
      })
  });
  return { follows };
}


export default connect(mapStateToProps)(UserFollow);
