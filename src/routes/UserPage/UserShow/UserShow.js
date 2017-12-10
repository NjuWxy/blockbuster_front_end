/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table } from 'antd';
import MainLayout from '../../../components/MainLayout/MainLayout';
import styles from './UserShow.css';
import UserSpace from '../../../components/UserPage/UserSpace/UserSpace';
import Nav from '../../../components/UserPage/Nav/Nav';
import ImageCard from '../../../components/UserPage/Card/ShowCard/ShowCard';


class UserShow extends React.Component {

  render() {
    return (
      <MainLayout location={this.props.location}>
        <UserSpace />
        <Nav location={this.props.location}/>
        <Row className={styles.content}>
          <Col offset={2} span={20}>
            {
              this.props.show.map((detail, index) => {
                return(
                  <ImageCard detail={detail} key={index} location={this.props.location} />
                )
              })
            }
          </Col>
        </Row>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { show } = state.show;
  return { show };
}


export default connect(mapStateToProps)(UserShow);

