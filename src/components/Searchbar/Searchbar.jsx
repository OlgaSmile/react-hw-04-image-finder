import { useState } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as SearchSVG } from '../../svg/SearchSVG.svg';

export default function Searchbar ({onSubmit}) {

  const [value, setValue] = useState('');

  function onChange ({ target: { value } }) {
    setValue( value );
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmit}>
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
            onChange={onChange}
            value={value}
          />
        </form>
      </header>
    );
  }
