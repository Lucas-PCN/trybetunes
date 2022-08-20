import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayOfMusics: [],
      artist: '',
      albumName: '',
      image: '',
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.catchMusics();
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

  catchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const request = await getMusics(id);
    const musics = request.slice(1);
    this.setState({
      arrayOfMusics: musics,
      artist: request[0].artistName,
      albumName: request[0].collectionName,
      image: request[0].artworkUrl100,
      loading: false,
    });
  }

  render() {
    const { arrayOfMusics, artist, albumName, loading, image, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="albumPage">
          <section className="album">
            <img
              src={ image }
              alt="Capa do álbum"
              className="albumImg"
            />
            <div>
              <p data-testid="album-name" className="albumName">{ albumName }</p>
              <p data-testid="artist-name" className="artistName">{ artist }</p>
            </div>
          </section>
          <section className="musicList">
            { (loading) && (<Loading />)}
            {arrayOfMusics.map((music) => (<MusicCard
              key={ music.trackId }
              music={ music }
              favoriteList={ favorites }
              albumName
            />))}
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
