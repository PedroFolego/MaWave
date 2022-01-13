import { Redirect } from 'react-router-dom';
import React from 'react';
import LOWEST_NUMBER from '../constants';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      btn: true,
      loading: false,
      redirect: false,
    };

    this.validateBtn = this.validateBtn.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  inputChange({ target }) {
    this.setState({ name: target.value }, () => this.validateBtn());
  }

  validateBtn() {
    const { name } = this.state;
    const btnEnable = name.length < LOWEST_NUMBER;
    this.setState({ btn: btnEnable });
  }

  validateUser() {
    const { name } = this.state;

    this.setState({ loading: true }, () => createUser({ name })
      .then(this.setState({ loading: false, redirect: true })));
  }

  render() {
    const { btn, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { redirect && <Redirect to="/search" />}
        { loading ? <Loading /> : (
          <form onSubmit={ (e) => e.preventDefault() }>
            <label htmlFor="name-input">
              <input
                id="name-input"
                type="text"
                data-testid="login-name-input"
                onChange={ this.inputChange }
              />
            </label>
            <button
              id="btn-input"
              type="submit"
              data-testid="login-submit-button"
              disabled={ btn }
              onClick={ this.validateUser }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
