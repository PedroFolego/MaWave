import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };
    this.saveSong = this.saveSong.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  async checkFavorite() {
    const { music } = this.props;
    const favoriteSongs = await getFavoriteSongs().then((data) => data);
    const hasFavorite = favoriteSongs.some((song) => song.trackId === music.trackId);
    this.setState({
      favorite: hasFavorite,
    });
  }

  saveSong({ target: { checked } }) {
    const { music } = this.props;
    this.setState({ loading: true });
    if (checked) {
      addSong(music).then(() => this.setState({ favorite: true, loading: false }));
    } else {
      removeSong(music).then(() => this.setState({ favorite: false, loading: false }));
    }
  }

  render() {
    const { favorite, loading } = this.state;
    const { music: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        <div className="container-music">
          <div className="music">
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
          <label htmlFor={ trackName } className="favorite-btn">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackName }
              type="checkbox"
              onClick={ this.saveSong }
              checked={ favorite }
              className="btn"
            />
          </label>
        </div>
        { loading && <Loading /> }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
