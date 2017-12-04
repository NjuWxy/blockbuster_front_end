/**
 * Created by john on 2017/10/27.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Input, Col, Row, Affix, Dropdown, BackTop, Modal } from 'antd';
import styles from './MainLayout.less';
import PostPhoto from '../../components/PostPhoto/PostPhoto';
import Login from '../Login/Login';

const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class MainLayout extends React.Component {
  handleClick = (e) => {
    if(e.key === 'Login'){
      this.showLogin();
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: `/${e.key}`
      }));
    }
  };
  handleSearch = (e) => {
    console.log(e.target.value);
  };
  handlePost = (e) => {
    if(e.key === 'PostPhoto'){
      this.showPostPhoto();
    }
  };
  showPostPhoto = () => {
    this.props.dispatch({
      type: 'modalStates/showPostPhoto',
      payload: { showPostPhoto: true }
    })
  };
  hidePostPhoto = () => {
    this.props.dispatch({
      type: 'modalStates/showPostPhoto',
      payload: { showPostPhoto: false }
    })
  };
  showLogin = () => {
    this.props.dispatch({
      type: 'modalStates/showLogin',
      payload: { showLogin: true }
    })
  };
  hideLogin = () => {
    this.props.dispatch({
      type: 'modalStates/showLogin',
      payload: { showLogin: false }
    })
  };
  render(){
    return (
      <Layout className={styles.layout}>
        <div className={styles.header}>
          <Row>
            <Col offset={1} span={2}>
              <div className={styles.logo}>大片儿</div>
            </Col>
            <Col offset={1} span={12}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={['']}
                mode="horizontal"
                className={styles.menus}
              >
                <Menu.Item key="Show"><Icon type="camera-o" />大片儿秀</Menu.Item>
                <Menu.Item key="Activity"><Icon type="notification" />活动</Menu.Item>
                <Menu.Item key="Forum"><Icon type="message" />论坛</Menu.Item>
              </Menu>
            </Col>
            <Col span={4}>
              <Input
                placeholder="搜索大片儿秀／活动"
                className={styles.search}
                onPressEnter={this.handleSearch}
              />
            </Col>
            <Col offset={1} span={2}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={['']}
                mode="horizontal"
                className={styles.menus}
              >
                {
                  this.props.isLogin
                    ?
                    <SubMenu
                      title={<span><Icon type="user" />{this.props.username}</span>}
                    >
                      <Menu.Item key="UserPage">主页</Menu.Item>
                      <Menu.Item key="Logout">退出</Menu.Item>
                      <Menu.Item key="CancelAccount">注销</Menu.Item>
                    </SubMenu>
                    :
                    <Menu.Item key="Login"><Icon type="setting"/>登录/注册</Menu.Item>
                }
              </Menu>
            </Col>
          </Row>
        </div>
        <Content className={styles.content}>
          <Row className={styles.row}>
            <Col span={22} offset={1} className={styles.col}>
              {this.props.children}
            </Col>
            <Col span={1}>
              <Affix offsetTop={68}>
                <Dropdown
                  overlay=
                    {
                      <Menu onClick={this.handlePost} selectedKeys={['']}>
                        <Menu.Item className={styles.layMenu} key="PostPhoto">秀大片儿</Menu.Item>
                        <Menu.Item className={styles.layMenu} key="PostActivity">发布活动</Menu.Item>
                      </Menu>
                    }
                  placement="bottomRight"
                >
                  <Icon className={styles.plus} type="plus-circle"/>
                </Dropdown>
              </Affix>
              <BackTop/>
            </Col>
          </Row>
          <Modal
            visible={this.props.showPostPhoto}
            footer={null}
            onCancel={this.hidePostPhoto}
            className={styles.postPhoto}
            title="秀出你的大片儿"
          >
            <PostPhoto />
          </Modal>
          <Modal
            visible={this.props.showLogin}
            footer={null}
            onCancel={this.hideLogin}
            className={styles.login}
            title="登录/注册"
          >
            <Login />
          </Modal>
        </Content>
        <Footer className={styles.footer}>
          Blockbuster ©2017 Created by Shea Wong
        </Footer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { isLogin, username } = state.users;
  const { showLogin, showPostPhoto } = state.modalStates;
  return { isLogin, username, showLogin, showPostPhoto };
}

export default connect(mapStateToProps)(MainLayout);
