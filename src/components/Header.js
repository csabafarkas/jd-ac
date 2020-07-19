import React, { Component } from 'react';
import styles from './Header.module.css';

export default class Header extends Component {
  render() {
    return (
      <div className={styles['header-container']}>
        <div className={styles['header-container--logo']}></div>
        <div className={styles['header-container--title']}>
          A/C Refill Order
        </div>
      </div>
    );
  }
}
