import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayOfMusics: [],
      artist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.catchMusics();
  }

  catchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    const musics = request.slice(1);
    console.log(musics);
    this.setState({
      arrayOfMusics: musics,
      artist: request[0].artistName,
      albumName: request[0].collectionName,
    });
    console.log(request);
  }

  render() {
    const { arrayOfMusics, artist, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artist }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        {arrayOfMusics.map(
          (music) => <MusicCard key={ music.trackId } music={ music } />,
        )}
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
