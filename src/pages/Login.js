import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';
import logo from '../images/logo.svg';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      userName: target.value,
    }, () => this.validateButton());
  }

  validateButton = () => {
    const {
      userName,
    } = this.state;

    const maxLength = 3;

    if (userName.length >= maxLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  callCreateUser = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const {
      userName,
      isButtonDisabled,
      loading,
      redirect,
    } = this.state;

    if (loading) return <Loading />;
    return (
      <section data-testid="page-login" className="login">
        <img
          src={ logo }
          alt="trybetunes logo"
          className="loginLogo"
        />
        <form className="loginForm">
          <input
            data-testid="login-name-input"
            id="nameInput"
            name="nameInput"
            type="text"
            value={ userName }
            onChange={ this.inputChange }
            className="loginInput"
            placeholder="Nome"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.callCreateUser }
            className="loginBtn"
          >
            Entrar
          </button>
          { redirect && <Redirect to="/search" /> }
        </form>
      </section>
    );
  }
}

export default Login;
