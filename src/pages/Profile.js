import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

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
      <div data-testid="page-profile" className="section-profile">
        <Header />
        <h1>Perfil</h1>
        <div className="user-class">
          {loading ? <Loading /> : (
            <>
              <div className="img-button">
                <Link to="/profile/edit">Editar perfil</Link>
                <img src={ image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png' } alt={ name } data-testid="profile-image" />
              </div>
              <div className="user-text">
                <div className="text-content">
                  <p>Nome:</p>
                  <h3>{name}</h3>
                </div>
                <div className="text-content">
                  <p>Descrição:</p>
                  <h4>{description}</h4>
                </div>
                <div className="text-content">
                  <p>Email:</p>
                  <h4>{email}</h4>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
