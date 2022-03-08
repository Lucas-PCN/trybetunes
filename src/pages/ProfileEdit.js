import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        Edit your profile.
      </div>
    );
  }
}

export default ProfileEdit;
