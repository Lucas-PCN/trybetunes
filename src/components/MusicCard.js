import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music: { trackName, previewUrl, trackId }, addFavoriteSong } = this.props;
    return (
      <div>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          Elemento não suportado pelo seu navegador
          <code>audio</code>
        </audio>
        <label htmlFor="favorita">
          <input
            id="favorita"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ addFavoriteSong }
          />
          Favorita
        </label>
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
  addFavoriteSong: PropTypes.func.isRequired,
};

export default MusicCard;
