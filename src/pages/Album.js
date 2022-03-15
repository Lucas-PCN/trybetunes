import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayOfMusics: [],
      artist: '',
      albumName: '',
      completeRequest: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.catchMusics();
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  catchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    const musics = request.slice(1);
    this.setState({
      arrayOfMusics: musics,
      artist: request[0].artistName,
      albumName: request[0].collectionName,
      completeRequest: request,
    });
  }

  addFavoriteSong = async () => {
    this.setState({ loading: true });
    const { completeRequest } = this.state;
    await addSong(completeRequest);
    this.setState({ loading: false });
  }

  render() {
    const { arrayOfMusics, artist, albumName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artist }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        { (loading) && (<Loading />)}
        {arrayOfMusics.map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
          addFavoriteSong={ this.addFavoriteSong }
        />))}
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
