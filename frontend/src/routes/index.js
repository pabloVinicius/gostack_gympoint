import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignIn } from '../pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
    </Switch>
  );
};

export default Routes;
