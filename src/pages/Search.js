import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      choseArtist: '',
      btn: true,
      albums: [],
      notFoundAlbums: false,
      loading: false,
    };

    this.validateBtn = this.validateBtn.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.validationAlbums = this.validationAlbums.bind(this);
  }

  validateBtn() {
    const LOWEST_NUMBER = 2;
    const { name } = this.state;
    const btnEnable = name.length < LOWEST_NUMBER;
    this.setState({ btn: btnEnable });
  }

  inputChange({ target }) {
    this.setState({
      name: target.value,
      choseArtist: target.value,
    }, () => this.validateBtn());
  }

  validationAlbums(artist) {
    if (artist.length >= 1) {
      this.setState({ name: '', albums: artist, loading: false });
    } else {
      this.setState({ notFoundAlbums: true, loading: false });
    }
  }

  async searchMusic() {
    const { name } = this.state;
    this.setState({ loading: true, albums: [], notFoundAlbums: false, btn: true });
    const artist = await searchAlbumsAPI(name);

    this.validationAlbums(artist);
  }

  render() {
    const { btn, albums, notFoundAlbums, loading, choseArtist } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        {loading ? <Loading /> : (
          <div className="search-section">
            <h1>O que gostaria ouvir?</h1>
            <form onSubmit={ (e) => e.preventDefault() }>
              <label htmlFor="input-music">
                <input
                  id="input-music"
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.inputChange }
                  placeholder="Digite o nome do artista/banda"
                />
              </label>
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ btn }
                onClick={ this.searchMusic }
              >
                Pesquisar
              </button>
            </form>
          </div>
        )}
        {notFoundAlbums && <h3>Nenhum álbum foi encontrado</h3>}
        {albums.length >= 1 && (
          <section className="section-music">
            <h2>
              Resultado de álbuns de:
              {' '}
              {choseArtist}
            </h2>
            <div className="section-albums">
              {albums.map((album) => (
                <Link
                  key={ album.collectionName }
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  className="div-album"
                >
                  <div className="album">
                    <h3>{ album.collectionName }</h3>
                    <h4>{ album.artistName }</h4>
                  </div>
                  <div className="foto">
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </div>
                </Link>))}
            </div>
          </section>)}
      </div>
    );
  }
}

export default Search;
