import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      theSearch: '',
      saveSearch: '',
      isButtonDisabled: true,
      loading: false,
      albums: [],
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

  handleClick = async () => {
    const { theSearch } = this.state;
    this.setState({
      loading: true,
      theSearch: '',
      saveSearch: theSearch,
    });
    const album = await searchAlbumsAPI(theSearch);
    this.setState({
      loading: false,
      albums: album,
    });
  }

  render() {
    const { theSearch, isButtonDisabled, loading, albums, saveSearch } = this.state;

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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Loading />}
        {!loading && albums.length === 0
        && <h2>Nenhum álbum foi encontrado</h2>}
        {!loading && albums.length !== 0 && (
          <>
            <h2>{`Resultado de álbuns de: ${saveSearch}`}</h2>
            <ul>
              {albums.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ `${album.collectionName} - ${album.artistName}` }
                    />
                    <h3>{ album.collectionName }</h3>
                    <p>{ album.artistName }</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default Search;
