import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.searchAlbum();
  }

  async searchAlbum() {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusics(id);
    const { artistName, collectionName } = musics[0];
    this.setState({ musics, artistName, albumName: collectionName });
  }

  render() {
    const { musics, artistName, albumName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">
          {artistName}
        </h1>
        <h2 data-testid="album-name">
          {albumName}
        </h2>
        {musics
          .filter((a, index) => index !== 0)
          .map((music) => (
            <MusicCard key={ music.trackName } music={ music } />
          ))}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
