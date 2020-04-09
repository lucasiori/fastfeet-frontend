import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import NewDelivery from '~/pages/NewDelivery';
import Deliveryman from '~/pages/Deliveryman';
import NewDeliveryman from '~/pages/NewDeliveryman';
import Recipient from '~/pages/Recipient';
import NewRecipient from '~/pages/NewRecipient';
import DeliveryProblem from '~/pages/DeliveryProblem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={NewDelivery} isPrivate />
      <Route path="/deliveries/:id" component={NewDelivery} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route path="/deliverymen/new" component={NewDeliveryman} isPrivate />
      <Route path="/deliverymen/:id" component={NewDeliveryman} isPrivate />

      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route path="/recipients/new" component={NewRecipient} isPrivate />
      <Route path="/recipients/:id" component={NewRecipient} isPrivate />

      <Route path="/problems" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
