import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import s from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('What will we look for?');
    }
    this.props.onSubmit(this.state.query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.button}>
              <span className={s.button_label}>Search</span>
            </button>

            <input
              className={s.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.query}
            />
          </form>
        </header>
      </>
    );
  }
}
