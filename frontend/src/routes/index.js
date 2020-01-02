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
  PlanForm,
  RegistrationForm,
} from '~/pages';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/:id" component={StudentForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/:id" exact component={PlanForm} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/:id"
        exact
        component={RegistrationForm}
        isPrivate
      />
      <Route path="/help_orders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
};

export default Routes;
