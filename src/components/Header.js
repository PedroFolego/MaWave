import React from 'react';
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
      </header>
    );
  }
}

export default Header;
