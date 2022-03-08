import React from 'react';
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
        header.
      </header>
    );
  }
}

export default Header;
