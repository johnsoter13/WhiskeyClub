import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { loginAction } from '../../state/auth/actions';

const withAuthorization = (condition, route) => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(route);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      // do it here
      return (
        <AuthUserContext.Consumer>
            {authUser => {
            this.props.dispatchLoginAction(authUser);
            return condition(authUser) ? <Component {...this.props} /> : null
            }}
        </AuthUserContext.Consumer>

      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps),
  )(WithAuthorization);
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: bindActionCreators(loginAction, dispatch),
});

export default withAuthorization;