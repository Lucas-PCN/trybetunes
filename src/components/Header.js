import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';
import '../styles/Header.css';
import logoHeader from '../images/logoHeader.svg';
import profileSilhouette from '../images/profileSilhouette.svg';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      theUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    this.setState({
      theUser: user,
      loading: false,
    });
  }

  render() {
    const { theUser, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header className="header" data-testid="header-component">
        <section className="headerMainContainer">
          <Link to="/">
            <img className="logoMainContainer" src={ logoHeader } alt="Logo" />
          </Link>
          <Link to="/profile" className="mainContainerUser">
            <img className="user-img" src={ profileSilhouette } alt="User silhouette" />
            <p className="userName" data-testid="header-user-name">
              { theUser.name }
            </p>
          </Link>
        </section>
        <section className="headerNavContainer">
          <nav className="navNavContainer">
            <NavLink
              data-testid="link-to-search"
              to="/search"
              className={ (isActive) => (
                isActive ? 'navLinkNavContainerActive' : 'navLinkNavContainer'
              ) }
            >
              Search
            </NavLink>
            <NavLink
              data-testid="link-to-favorites"
              to="/favorites"
              className={ (isActive) => (
                isActive ? 'navLinkNavContainerActive' : 'navLinkNavContainer'
              ) }
            >
              Favorites
            </NavLink>
            <NavLink
              data-testid="link-to-profile"
              to="/profile"
              className={ (isActive) => (
                isActive ? 'navLinkNavContainerActive' : 'navLinkNavContainer'
              ) }
            >
              Profile
            </NavLink>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
