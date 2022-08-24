import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getAllFavoriteSongs();
  }

  getAllFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: [...favoriteSongs],
    });
  }

  addFavorite = ({ target }, song) => {
    const { favorites } = this.state;
    const { checked } = target;
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await addSong(song);
        this.setState(({
          favorites: [...favorites, song],
        }));
      } else {
        await removeSong(song);
        this.setState({
          favorites: favorites.filter((fav) => fav.trackId !== song.trackId),
        });
      }
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { favorites.length === 0
          ? (<p className="favT">Você ainda não possui nenhuma música favoritada</p>) : (
            <div className="favoritePage">
              <section className="musicList">
                { (loading) && (<Loading />)}
                {favorites.map((music) => (
                  <div className="musicCardFavorite" key={ music.trackId }>
                    <MusicCard
                      key={ music.trackId }
                      music={ music }
                      isComingFromAlbumPage={ false }
                    />
                    <label htmlFor={ music.trackId }>
                      Favorita
                      <input
                        id={ music.trackId }
                        type="checkbox"
                        onChange={ (e) => this.addFavorite(e, music) }
                        checked={ favorites.some((fav) => fav.trackId === music.trackId) }
                        data-testid={ `checkbox-music-${music.trackId}` }
                      />
                    </label>
                  </div>
                ))}
              </section>
            </div>)}
      </div>
    );
  }
}

export default Favorites;
