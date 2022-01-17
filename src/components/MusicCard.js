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
    const { music, changeLoading } = this.props;
    changeLoading();
    this.setState((prevState) => ({ favorite: !prevState.favorite }));
    if (checked) {
      addSong(music).then(() => this.setState({ favorite: true }));
    } else {
      removeSong(music).then(() => this.setState({ favorite: false }));
    }
    changeLoading();
  }

  render() {
    const { favorite, loading } = this.state;
    const { music: { trackName, previewUrl, trackId }, changeLoading } = this.props;
    return (
      <div>
        <button type="button" onClick={ this.saveSong }>aperte</button>
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
              onChange={ this.saveSong }
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
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};
