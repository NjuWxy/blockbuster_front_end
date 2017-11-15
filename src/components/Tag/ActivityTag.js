/**
 * Created by john on 2017/11/3.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './ActivityTag.css';

class ActivityTag extends React.Component {
  state = {
    popoverState: styles.hidePopover
  };
  showPopover = () => {
    this.setState({
      popoverState: styles.showPopover
    })
  };
  hidePopover = () => {
    this.setState({
      popoverState: styles.hidePopover
    })
  };
  render() {
    return (
      <div
        className={styles.activityTag}
        onMouseEnter={this.showPopover}
        onMouseLeave={this.hidePopover}
      >
        {this.props.children}
        <div className={this.state.popoverState}>
          <div>{this.props.children}</div>
        </div>
        </div>
    )
  }
}

export default connect()(ActivityTag);
