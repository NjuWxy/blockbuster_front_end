/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button, message, Row, Col } from 'antd';
import styles from './ChangePassword.css';

const FormItem = Form.Item;

class ChangePasswordForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.confirmPassword !== values.newPassword){
          message.error("两次输入密码不一致");
          return;
        }
        this.props.dispatch({
          type: 'user/changePassword',
          payload:{
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          }
        });
      }
    });
  };

  handleCancel = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={8} offset={8} className={styles.content}>
          <Form onSubmit={this.handleSubmit} className={styles.form}>
            <h1 className={styles.header}>修改密码</h1>
            <FormItem>
              {getFieldDecorator('oldPassword', {
                rules: [
                  { required: true, message: '请输入您的原密码!' }],
              })(
                <Input prefix={<Icon type="password" style={{ fontSize: 13 }} />} placeholder="原密码" style={{height: 40, marginTop: 20}} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入您的新密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="新密码" style={{height: 40, marginTop:20}} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirmPassword', {
                rules: [{ required: true, message: '请确认您的新密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认新密码" style={{height: 40, marginTop:20}} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.form_button}>
                确认
              </Button>
              <Button type="primary" className={styles.form_button_cancel} onClick={this.handleCancel}>
                取消
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const ChangePassword = Form.create()(ChangePasswordForm);

export default connect()(ChangePassword);

