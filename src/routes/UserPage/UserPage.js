/**
 * Created by john on 2017/10/28.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './UserPage.css';
import UserSpace from '../../components/UserPage/UserSpace/UserSpace';
import Nav from '../../components/UserPage/Nav/Nav';


class UserPage extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <UserSpace />
        <Nav location={this.props.location}/>
      </MainLayout>
    )
  }
}

export default connect()(UserPage);
