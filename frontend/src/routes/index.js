import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import { SignIn, Students, Plans, Registrations, HelpOrders } from '~/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/help_orders" component={HelpOrders} isPrivate />
    </Switch>
  );
};

export default Routes;
