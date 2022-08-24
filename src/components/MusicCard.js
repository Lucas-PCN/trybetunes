import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ favSongs: await getFavoriteSongs() });
  }

  addFavorite = ({ target }, song) => {
    const { favSongs } = this.state;
    const { checked } = target;
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await addSong(song);
        this.setState(({
          favSongs: [...favSongs, song],
        }));
      } else {
        await removeSong(song);
        this.setState({
          favSongs: favSongs.filter((fav) => fav.trackId !== song.trackId),
        });
      }
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { music: { trackName, previewUrl, trackId },
      music, isComingFromAlbumPage } = this.props;
    const { loading, favSongs } = this.state;
    return (
      <div className="card">
        <span className="musicName">
          { trackName }
        </span>
        <section className="cardAudioSection">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            Elemento não suportado pelo seu navegador
            {' '}
            <code>audio</code>
            .
          </audio>
          {loading && <Loading />}
          {!loading && isComingFromAlbumPage && (
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                onChange={ (e) => this.addFavorite(e, music) }
                checked={ favSongs.some((fav) => fav.trackId === trackId) }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          )}
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  isComingFromAlbumPage: PropTypes.bool.isRequired,
};

export default MusicCard;
