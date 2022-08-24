import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    this.setState({ loading: true }, async () => {
      this.setState({
        user: await getUser(),
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {loading && <Loading />}
          {!loading && (
            <section className="profile-sect">
              <section className="flex-container-h flex-img-sect">
                <section className="img-sect">
                  <img
                    className="profile-image"
                    data-testid="profile-image"
                    src={ user.image }
                    alt={ user.name }
                  />
                </section>
                <Link className="link-edit" to="/profile/edit">Editar perfil</Link>
              </section>
              <section className="flex-container-h flex-profile">
                <h3 className="profile-title">Nome: </h3>
                <p className="profile-content">{user.name}</p>
              </section>
              <section className="flex-container-h  flex-profile">
                <h3 className="profile-title">Email: </h3>
                <p className="profile-content">{ user.email }</p>
              </section>
              <h3 className="profile-title">Descrição: </h3>
              <p className="profile-content">{user.description}</p>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
