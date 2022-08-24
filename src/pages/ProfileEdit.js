import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import '../styles/ProfileEdit.css';

const userApi = require('../services/userAPI');

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      updated: false,
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = () => {
    this.setState({ loading: true }, async () => {
      this.setState({
        user: await userApi.getUser(),
        loading: false,
        disabled: true,
      }, () => {
        this.formCheck();
      });
    });
  }

  handleInput = ({ target }) => {
    this.setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [target.name]: target.value,
      },
    }), () => this.formCheck());
  }

  formCheck = () => {
    const { user } = this.state;
    const allInputs = [user.name, user.email, user.description, user.image];
    const verifyEmail = user.email.match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{2,}/gi);
    const verifyInputs = allInputs.every((input) => input !== '');
    const isValid = verifyEmail && verifyInputs;
    this.setState({ disabled: !isValid });
  }

  updateUser = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      const { user } = this.state;
      await userApi.updateUser(user);
      this.setState({
        loading: false,
        updated: true,
      });
    });
  }

  render() {
    const { loading, user, disabled, updated } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading && <Loading />}
          {!loading && !updated && (
            <form className="flex-container-v">
              <input
                className="input"
                type="text"
                placeholder="Nome"
                name="name"
                value={ user.name }
                onChange={ this.handleInput }
                data-testid="edit-input-name"
              />
              <input
                className="input"
                type="email"
                name="email"
                value={ user.email }
                placeholder="E-mail"
                onChange={ this.handleInput }
                data-testid="edit-input-email"
              />
              <textarea
                className="textarea"
                placeholder="Descrição"
                name="description"
                value={ user.description }
                onChange={ this.handleInput }
                data-testid="edit-input-description"
              />
              <input
                className="input"
                type="text"
                name="image"
                placeholder="Foto"
                value={ user.image }
                onChange={ this.handleInput }
                data-testid="edit-input-image"
              />
              <button
                className="button"
                type="button"
                data-testid="edit-button-save"
                onClick={ this.updateUser }
                disabled={ disabled }
              >
                Salvar
              </button>
            </form>
          )}
          {updated && <Redirect to="/profile" />}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
