/**
 * Created by john on 2017/10/27.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Menu } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './Show.css';
import ImageCard from '../../components/Show/ImageCard';
import Nav from '../../components/Show/Nav/Nav';

class Show extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <Nav location={this.props.location} />
        <div className={styles.imagePart}>
          {
            this.props.hotShow.map((show, index) => {
              return(
                <ImageCard show={show} key={index}/>
              )
            })
          }
        </div>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { hotShow } = state.show;
  return { hotShow };
}

export default connect(mapStateToProps)(Show);
