import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Form, Button, Input} from '@momentum-ui/react';

import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn';
import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpPage = () => (
  <div className="auth-container">
    <div className="auth-form-container">
      <div className="auth-form">
        <h1 className="auth-form-header">Sign Up</h1>
        <SignUpForm />
        <SignInLink />
      </div>
    </div>
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {

        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            email,
            displayName: username,
          })
          .then(() => {
            const user = this.props.firebase.doGetCurrentUser();

            user.updateProfile({email, displayName: username});
          })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
          <div className="submit-button-container">
            <Button className="submit-button" disabled={isInvalid} type="submit">
              Sign Up
            </Button>
          </div>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const condition = authUser => !authUser;

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition, ROUTES.HOME)
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };