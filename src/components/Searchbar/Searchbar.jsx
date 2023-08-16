import { Component } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as SearchSVG } from '../../svg/SearchSVG.svg';

export default class Searchbar extends Component {
  state = {
    value: '',
  };
  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}></span>
            <SearchSVG width="32" height="32" fill="black" />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}