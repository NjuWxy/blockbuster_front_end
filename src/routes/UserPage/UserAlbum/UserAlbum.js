/**
 * Created by john on 2017/12/7.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Input } from 'antd';
import MainLayout from '../../../components/MainLayout/MainLayout';
import styles from './UserAlbum.css';
import UserSpace from '../../../components/UserPage/UserSpace/UserSpace';
import Nav from '../../../components/UserPage/Nav/Nav';
import AlbumCard from '../../../components/UserPage/Card/AlbumCard/AlbumCard';


class UserAlbum extends React.Component {

  state = {
    showCreateButton: true,
    createAlbumValue: '',
  };

  createAlbum = () => {
    this.setState({
      showCreateButton: false
    })
  };

  handleInputChange = (e) => {
    this.setState({
      createAlbumValue: e.target.value
    })
  };

  confirmCreate = () => {
    this.props.dispatch({
      type: 'user/createAlbum',
      payload: {
        album: this.state.createAlbumValue,
      }
    });
    this.setState({
      showCreateButton: true,
      createAlbumValue: '',
    })
  };

  render() {
    let { albums, location } = this.props;
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let column4 = [];
    for(let i=0;i<albums.length;i++){
      if(i%4 === 0){
        column1.push(<AlbumCard detail={albums[i]} key={i} location={location} />);
      }else if(i%4 === 1){
        column2.push(<AlbumCard detail={albums[i]} key={i} location={location} />);
      }else if(i%4 === 2){
        column3.push(<AlbumCard detail={albums[i]} key={i} location={location} />);
      }else {
        column4.push(<AlbumCard detail={albums[i]} key={i} location={location} />);
      }
    }
    return (
      <MainLayout location={this.props.location}>
        <UserSpace location={this.props.location} />
        <Nav location={this.props.location}/>
        <Row className={styles.buttonPart}>
          <Col offset={2} span={20}>
            {
              this.state.showCreateButton?
                <Button className={styles.createAlbum} onClick={this.createAlbum}>新建专辑</Button>
                :
                <Input
                  value={this.state.createAlbumValue}
                  className={styles.createAlbumInput}
                  onBlur={this.confirmCreate}
                  onPressEnter={this.confirmCreate}
                  onChange={this.handleInputChange}
                />
            }
          </Col>
        </Row>
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
  const { albums } = state.user;
  return { albums };
}


export default connect(mapStateToProps)(UserAlbum);

