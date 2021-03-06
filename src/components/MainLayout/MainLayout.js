/**
 * Created by john on 2017/10/27.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Input, Col, Row, Affix, Dropdown, BackTop, Modal,message,Badge } from 'antd';
import styles from './MainLayout.less';
import { isLogin, getUsername } from '../../utils/userHelper';

const { Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class MainLayout extends React.Component {
  handleClick = (e) => {
    //登陆／注册
   if(e.key === 'Logout'){
      this.props.dispatch({
        type: 'user/logout',
      });
    } else {
      this.props.dispatch(routerRedux.push({
        pathname:`/${e.key}`
      }))
    }
  };
  handleSearch = (e) => {
    const key = e.target.value;
    this.props.dispatch(routerRedux.push({
      pathname: '/SearchShow',
      query: { key }
    }))
  };
  /**
   * 点击发布（发布活动或发布大片儿），需要首先判断用户是否已登陆
   */
  handlePost = () => {
    if(!isLogin()){
      message.error("请先登陆");
      return;
    }else {
      this.props.dispatch(routerRedux.push({
        pathname: `/PostPhoto`
      }))
    }
  };

  render(){
    return (
      <Layout className={styles.layout}>
        <div className={styles.header}>
          <Row>
            <Col offset={1} span={2}>
              <div className={styles.logo}>大片儿</div>
            </Col>
            <Col offset={12} span={4}>
              <Input
                placeholder="输入关键字搜索大片儿"
                className={styles.search}
                onPressEnter={this.handleSearch}
              />
            </Col>
            <Col span={4}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={['']}
                mode="horizontal"
                className={styles.menus}
              >
                <Menu.Item key="Show"><Icon type="camera-o" />大片儿秀</Menu.Item>
                {
                  isLogin()
                    ?
                    <SubMenu
                      title={<span><Icon type="user" />{ getUsername() }</span>}
                    >
                      <Menu.Item key="UserShow">个人主页</Menu.Item>
                      <Menu.Item key="ChangePassword">修改密码</Menu.Item>
                      <Menu.Item key="Logout">退出登陆</Menu.Item>
                    </SubMenu>
                    :
                    <Menu.Item key="Login"><Icon type="setting"/>登录/注册</Menu.Item>
                }
              </Menu>
            </Col>
          </Row>
        </div>
        <Content className={styles.content}>
          {
            this.props.location.pathname.substring(0,5) === '/User'||this.props.location.pathname === '/PostPhoto'|| this.props.location.pathname ==='/VisitedUserShow'?
              this.props.children
              :
              <Row className={styles.row}>
                <Col span={22} offset={1} className={styles.col}>
                  {this.props.children}
                </Col>
                <Col span={1}>
                  <Affix offsetTop={68}>
                    <Icon className={styles.plus} type="plus-circle" onClick={this.handlePost} />
                  </Affix>
                  <BackTop/>
                </Col>
              </Row>
          }
        </Content>
        <Footer className={styles.footer}>
          Blockbuster ©2017 Created by Shea Wong
        </Footer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { showLogin } = state.modalStates;
  return { showLogin };
}

export default connect(mapStateToProps)(MainLayout);
