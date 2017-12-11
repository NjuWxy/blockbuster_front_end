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
import ShowCard from '../../../components/UserPage/Card/ShowCard/ShowCard';


class UserShow extends React.Component {

  render() {
    let { show, location } = this.props;
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let column4 = [];
    for(let i=0;i<show.length;i++){
      if(i%4 === 0){
        column1.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else if(i%4 === 1){
        column2.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else if(i%4 === 2){
        column3.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }else {
        column4.push(<ShowCard detail={show[i]} key={i} location={location} />);
      }
    }
    return (
      <MainLayout location={this.props.location}>
        <UserSpace location={this.props.location} />
        <Nav location={this.props.location}/>
        <Row className={styles.content}>
          <Col offset={2} span={20}>
            <Row type="flex" justify="space-between" align="top">
              <Col span={24}>
                <Row type="flex" justify="space-between" align="top" >
                  <Col span={6}>
                    {column1}
                  </Col>
                  <Col span={6}>
                    {column2}
                  </Col>
                  <Col span={6}>
                    {column3}
                  </Col>
                  <Col span={6}>
                    {column4}
                  </Col>
                </Row>
              </Col>
            </Row>
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

