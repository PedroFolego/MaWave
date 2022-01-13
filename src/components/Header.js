import React from 'react';
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
      <header data-testid="header-component">
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{ name }</h2> }
        <Link to="/search" data-testid="link-to-search">Procurar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
