import React, { Component } from 'react';

export default class App extends Component {
  state = {
    firstName: '',
    firstNameValidationMessage: '',
    lastName: '',
    lastNameValidationMessage: '',
    email: '',
    emailValidationMessage: '',
  };

  handleChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { firstNameValidationMessage } = this.state;
    return (
      <div>
        <input
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChangeInput}
        />

        {firstNameValidationMessage !== '' && (
          <p>{firstNameValidationMessage}</p>
        )}

        <input
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChangeInput}
        />

        <input
          name="email"
          value={this.state.email}
          onChange={this.handleChangeInput}
        />
      </div>
    );
  }
}
