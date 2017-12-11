/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Icon, Avatar, message, Modal, Upload } from 'antd';
import styles from './UserSpace.css';
import { getWinHeight } from '../../../utils/tools';
import { getUsername, isLogin } from '../../../utils/userHelper';

class UserSpace extends React.Component{
  state = {
    visible: false,
    fileList: [],
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = () => {
    if(this.state.fileList.length === 0){
      message.error("您没有做任何更新");
      return;
    }else {
      this.props.dispatch({
        type: 'user/postAvatar',
        payload: {
          fileName: this.state.fileList[0].name,
          pathname: this.props.location.pathname,
        }
      });
      this.setState({
        visible:false,
        fileList: [],
      });
    }
  };

  handlePost = () => {
    if(!isLogin()){
      message.error("请先登陆");
    }else {
      this.props.dispatch(routerRedux.push({
        pathname: '/PostPhoto',
      }));
    }
  };

  changeAvatar = () => {
    this.setState({
      visible: true
    });
  };

  cancelChangeAvatar = () => {
    this.setState({
      visible: false
    });
  };



  render(){
    const winHeight = getWinHeight();
    const userSpaceHeight = winHeight/3;
    return(
      <div>
        <Row style={{ minHeight: userSpaceHeight }} className={styles.userSpace}>
          <Col offset={11} span={2} style={{ marginTop: userSpaceHeight/3, textAlign: 'center' }}>
            <Avatar className={styles.avatar} src={this.props.avatar} onClick={this.changeAvatar} />
          </Col>
          <Col offset={11} span={2} className={styles.namePart}>
            <div className={styles.username}>{getUsername()}</div>
          </Col>
          <Col offset={9} span={6} className={styles.notePart}>
            <div className={styles.note}>只要有一双发现美的眼睛，生活中处处有惊喜<Icon type="edit" className={styles.edit} /></div>
            <Button className={styles.post} onClick={this.handlePost}>发布</Button>
          </Col>
        </Row>
        <Modal
          title={null}
          visible={this.state.visible}
          footer={null}
          onCancel={this.cancelChangeAvatar}
          bodyStyle={{minHeight: 540}}
          width={400}
        >
          <div className={styles.content}>
            <div className={styles.upload}>
              <h2 className={styles.header}>修改头像</h2>
              <Upload
                action="/api/user/upload"
                listType="picture-card"
                fileList={this.state.fileList}
                onChange={this.handleChange}
              >
                {
                  this.state.fileList.length >= 1 ?
                    null
                    :
                    <div>
                      <Icon type="plus"/>
                      <div className="ant-upload-text">上传头像</div>
                    </div>
                }
              </Upload>
              <Button onClick={this.handleSubmit} className={styles.button} type="primary">提交</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { avatar } = state.user;
  return { avatar };
}


export default connect(mapStateToProps)(UserSpace);
