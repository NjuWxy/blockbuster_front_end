/**
 * Created by john on 2017/10/27.
 */
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Menu } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './Show.css';
import ShowCard from '../../components/Show/Card/ShowCard';
import Nav from '../../components/Show/Nav/Nav';

class Show extends React.Component {
  render() {
    return (
      <MainLayout location={this.props.location}>
        <Nav location={this.props.location} />
        <div className={styles.imagePart}>
          {
            this.props.show.map((detail, index) => {
              return(
                <ShowCard detail={detail} key={index} location={this.props.location} />
              )
            })
          }
        </div>
      </MainLayout>
    )
  }
}

function mapStateToProps(state) {
  const { show } = state.show;
  return { show };
}

export default connect(mapStateToProps)(Show);
