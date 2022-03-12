import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      theSearch: '',
      isButtonDisabled: true,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      theSearch: target.value,
    }, () => this.validateButton());
  }

  validateButton = () => {
    const {
      theSearch,
    } = this.state;

    const maxLength = 2;

    if (theSearch.length >= maxLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  render() {
    const { theSearch, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form htmlFor="search">
          <input
            id="search"
            name="search"
            type="text"
            data-testid="search-artist-input"
            value={ theSearch }
            onChange={ this.inputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        search.
      </div>
    );
  }
}

export default Search;
