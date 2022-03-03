import { Redirect } from 'react-router-dom';
import React from 'react';
import LOWEST_NUMBER from '../constants';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/Login.css';

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
      .then(this.setState({
        loading: false,
        redirect: true,
      })));
  }

  render() {
    const { btn, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="body">
        <div className="login">
          { redirect && <Redirect to="/search" />}
          { loading ? <Loading /> : (
            <>
              <h1>Login</h1>
              <form onSubmit={ (e) => e.preventDefault() } className="form">
                <label htmlFor="name-input">
                  <input
                    id="name-input"
                    type="text"
                    data-testid="login-name-input"
                    onChange={ this.inputChange }
                    placeholder="Digite seu nome"
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
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
