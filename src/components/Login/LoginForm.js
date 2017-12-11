/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item;

class LoginFormClass extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          payload:{
            email: values.email,
            password: values.password
          }
        });
      }
    });
  };

  turnToSigninForm = () => {
    this.props.dispatch({
      type: 'modalStates/isLoginForm',
      payload: {
        isLoginForm: false
      }
    })
  };

  handleCancel = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <h1 className={styles.header}>登陆<span className={styles.mention}>还没有账号？<span className={styles.anotherFormNow} onClick={this.turnToSigninForm}>马上注册!</span></span></h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: '邮箱格式不正确!'},
              { required: true, message: '请输入您的邮箱!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" style={{height: 40, marginTop: 20}} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" style={{height: 40, marginTop:20}} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.form_button}>
            登陆
          </Button>
          <Button type="primary" className={styles.form_button_cancel} onClick={this.handleCancel}>
            取消
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(LoginFormClass);

export default connect()(LoginForm);
