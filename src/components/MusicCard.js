import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };
    this.saveSong = this.saveSong.bind(this);
  }
  //

  saveSong({ target: { checked } }) {
    const { music } = this.props;
    this.setState({ loading: true });
    if (checked) {
      addSong(music).then(() => this.setState({ favorite: true, loading: false }));
    } else {
      this.setState({ favorite: false, loading: false });
    }
  }

  render() {
    const { favorite, loading } = this.state;
    const { music } = this.props;
    const { music: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        <div>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackName }>
            Favorita
            <input
              music={ music }
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackName }
              type="checkbox"
              onClick={ this.saveSong }
              checked={ favorite }
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
