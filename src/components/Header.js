import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((response) => this.setState({ name: response.name, loading: false }));
  }

  render() {
    const { loading, name } = this.state;

    return (
      <header className="header" data-testid="header-component">
        <div className="header-section">
          <div className="logo-name">
            {loading ? <Loading /> : <h1 data-testid="header-user-name">{ name }</h1> }
            <div className="hide">Olá! :)</div>
          </div>
          <section className="section-links">
            <Link
              className="link"
              to="/search"
              data-testid="link-to-search"
            >
              <h2>Procurar</h2>
            </Link>
            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <h2>Favoritos</h2>
            </Link>
            <Link
              className="link"
              to="/profile"
              data-testid="link-to-profile"
            >
              <h2>Perfil</h2>
            </Link>
          </section>
        </div>
      </header>
    );
  }
}

export default Header;
