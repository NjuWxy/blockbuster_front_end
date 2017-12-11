/**
 * Created by john on 2017/12/3.
 */
/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item;

class SigninForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/signUp',
          payload:{
            username: values.username,
            email: values.email,
            password: values.password
          }
        });
      }
    });
  };

  turnToLoginForm = () => {
    this.props.dispatch({
      type: 'modalStates/isLoginForm',
      payload: {
        isLoginForm: true
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
        <h1 className={styles.header}>注册<span className={styles.mention}>已经有账号？<span className={styles.anotherFormNow} onClick={this.turnToLoginForm}>立即登陆</span></span></h1>
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
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的昵称!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="昵称" style={{height: 40, marginTop: 20}} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" style={{height: 40, marginTop: 20}} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.form_button}>
            注册
          </Button>
          <Button type="primary" className={styles.form_button_cancel} onClick={this.handleCancel}>
            取消
          </Button>
        </FormItem>

      </Form>
    );
  }
}

const Signin = Form.create()(SigninForm);

export default connect()(Signin);
