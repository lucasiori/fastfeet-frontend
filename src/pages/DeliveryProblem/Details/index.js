import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Details({ problem }) {
  return (
    <Container>
      <h3>Descrição do problema</h3>

      <span>{problem.description}</span>
    </Container>
  );
}

Details.propTypes = {
  problem: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};
