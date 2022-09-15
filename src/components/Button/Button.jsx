import s from '../Button/Button.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button type="button" className={s.button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}
