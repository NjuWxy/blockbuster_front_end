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

  toDetail = (aid) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/AlbumDetail',
      query: {
        aid
      }
    }))
  };


  render() {
    return (
      <MainLayout location={this.props.location}>
        <UserSpace />
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
            {
              this.props.albums.map((detail, index) => {
                return(
                  <AlbumCard detail={detail} key={index} location={this.props.location} />
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
  const { albums } = state.user;
  return { albums };
}


export default connect(mapStateToProps)(UserAlbum);

