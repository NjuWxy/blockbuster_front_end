import React from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col } from 'antd';
import LoginForm from '../../components/Login/LoginForm';
import SigninForm from '../../components/Login/SigninForm';
import styles from './Login.css';

function Login({location, isLoginForm }) {
  return(
    <Row>
      <Col offset={8} span={8} className={styles.content}>
        {
          isLoginForm ? <LoginForm location={location} /> : <SigninForm location={location} />
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
