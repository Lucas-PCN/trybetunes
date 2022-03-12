import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

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
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ theUser.name }</p>
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Músicas favoritas </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        header.
      </header>
    );
  }
}

export default Header;
