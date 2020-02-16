import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form, Button, Input, FormSection} from '@momentum-ui/react';
import { compose } from 'recompose';
import {withRouter} from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {withAuthorization} from '../Session';
import { SignInLink } from '../SignIn';

const PasswordForgetPage = () => (
  <div className="pw-forget-container">
    <div className="pw-forget-form">
      <PasswordForgetForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.props.history.push(ROUTES.SIGN_IN);
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <FormSection title="Password Forget" description="If your email has a valid account, we will send you a link to reset it. (Check your spam folder if you don't see it)">
          <Input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </FormSection>
        <div className="pw-forget-form__footer">
          <SignInLink />
          <Button disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const condition = authUser => !authUser;

const PasswordForgetForm = compose(
  withFirebase,
  withRouter,
  withAuthorization(condition, ROUTES.HOME))(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };