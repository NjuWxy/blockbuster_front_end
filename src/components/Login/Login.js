/**
 * Created by john on 2017/12/3.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import LoginForm from './LoginForm';
import SigninForm from './SigninForm';

function Login({ isLoginForm }) {
  return(
    <Row>
      <Col offset={4} span={16}>
        {
          isLoginForm ? <LoginForm/> : <SigninForm/>
        }
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const { isLoginForm } = state.modalStates;
  return { isLoginForm };
}

export default connect(mapStateToProps)(Login);
