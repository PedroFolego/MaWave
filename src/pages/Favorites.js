import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };

    this.getMusics = this.getMusics.bind(this);
    this.changeLoading = this.changeLoading.bind(this);
  }

  componentDidMount() {
    this.getMusics();
    this.changeLoading();
  }

  componentDidUpdate() {
    this.getMusics();
  }

  async getMusics() {
    const musics = await getFavoriteSongs().then((data) => data);
    this.setState({ musics: [...musics] });
  }

  changeLoading() {
    this.setState((prev) => (prev.loading === true ? { loading: false } : { loading: true }), console.log(this.state.loading));
  }

  render() {
    const { musics, loading } = this.state;
    return (
      <section data-testid="page-favorites" className="favorite-section">
        <Header />
        <h1 className="favorite-card">Suas músicas favoritas!</h1>
        {loading ? <Loading /> : musics
          .map((music) => (<MusicCard
            key={ music.trackName }
            music={ music }
            changeLoading={ this.changeLoading }
          />))}
      </section>
    );
  }
}

export default Favorites;
