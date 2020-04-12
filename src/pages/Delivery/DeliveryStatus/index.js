import React from 'react';
import PropTypes from 'prop-types';

import { Started, Finalized, Canceled, Pending } from './styles';

export default function DeliveryStatus({ status }) {
  if (status === 'started') {
    return <Started>Retirada</Started>;
  }

  if (status === 'finalized') {
    return <Finalized>Entregue</Finalized>;
  }

  if (status === 'canceled') {
    return <Canceled>Cancelada</Canceled>;
  }

  return <Pending>Pendente</Pending>;
}

DeliveryStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
