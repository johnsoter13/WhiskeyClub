import React from 'react';
import {Button} from '@momentum-ui/react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button className="signout-button" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);