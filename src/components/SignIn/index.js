import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {Form, Button, Input} from '@momentum-ui/react';

import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';

const SignInPage = () => (
  <div className="auth-container">
    <div className="auth-form-container">
      <div className="auth-form">
        <h1 className="auth-form-header">Whiskey Club</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <div className="submit-button-container">
          <Button className="submit-button" disabled={isInvalid} type="submit">
            Sign In
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInLink = () => (
  <p>
    Remember your information? Go back to <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const condition = authUser => !authUser;

const SignInForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition, ROUTES.HOME)
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };