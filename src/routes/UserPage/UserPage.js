/**
 * Created by john on 2017/10/28.
 */
import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';

class UserPage extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <div>UserPage</div>
      </MainLayout>
    )
  }
}

export default connect()(UserPage);
