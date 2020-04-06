import React from 'react';
import PropTypes from 'prop-types';

import { Container, CancelButton, ConfirmButton } from './styles';

export default function Alert({ title, message, onCancel, onConfirm }) {
  return (
    <Container>
      <h3>{title}</h3>
      <span>{message}</span>

      <div>
        <CancelButton onClick={onCancel}>NÃO</CancelButton>
        <ConfirmButton onClick={onConfirm}>SIM</ConfirmButton>
      </div>
    </Container>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
