import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from './IndexPage.css';

function click() {
  console.log($('#yay').children());
}

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 id="yay" className={styles.title} onClick={click}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
      <div>ok</div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
