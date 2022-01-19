import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: {},
    };

    this.getAPI = this.getAPI.bind(this);
  }

  componentDidMount() {
    this.getAPI();
  }

  async getAPI() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user: { name, image, description, email }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <Link to="/profile/edit">Editar perfil</Link>
            <img src={ image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png' } alt={ name } data-testid="profile-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <h4>{email}</h4>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
