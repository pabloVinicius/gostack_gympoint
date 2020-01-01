import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import {
  SignIn,
  Students,
  Plans,
  Registrations,
  HelpOrders,
  StudentForm,
} from '~/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/help_orders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
};

export default Routes;
