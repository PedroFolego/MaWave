import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      image: '',
      description: '',
      email: '',
      btnDisable: true,
      redirect: false,
    };

    this.getAPI = this.getAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.validationBtn = this.validationBtn.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      this.getAPI();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validationBtn());
  }

  async getAPI() {
    const { name, image, description, email } = await getUser();
    this.setState({
      name,
      image,
      description,
      email,
      loading: false });
  }

  saveUser() {
    this.setState({ redirect: true });
    const { name, email, image, description } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    updateUser(user);
  }

  validationBtn() {
    const { name, image, description, email } = this.state;
    if (
      name !== ''
      && image !== ''
      && description !== ''
      && email !== ''
    ) {
      this.setState({ btnDisable: false });
    }
  }

  render() {
    const { btnDisable, loading, name, image, description, email, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form onSubmit={ (e) => e.preventDefault() }>
            <label htmlFor="name">
              Nome
              <input
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                type="text"
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                type="email"
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                id="description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                type="text"
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="image">
              Foto
              <input
                id="image"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                type="text"
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ btnDisable }
              onClick={ this.saveUser }
            >
              Salvar
            </button>
          </form>
        )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
