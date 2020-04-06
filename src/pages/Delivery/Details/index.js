import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatZipCode } from '~/utils/format';

import { Container } from './styles';

export default function Details({ delivery }) {
  return (
    <Container>
      <h3>Informações da encomenda</h3>

      <div>
        <strong>Produto</strong>
        <span>{delivery.product}</span>
      </div>

      <div>
        <strong>Endereço de entrega</strong>
        <span>
          {delivery.recipient.address}, {delivery.recipient.number}
        </span>
        <span>
          {delivery.recipient.city} - {delivery.recipient.state}
        </span>
        <span>{formatZipCode(delivery.recipient.zip_code)}</span>
      </div>

      {(delivery.start_date || delivery.end_date) && (
        <div>
          <strong>Datas</strong>

          <span>
            <strong>Retirada: </strong>
            {format(parseISO(delivery.start_date), "dd/MM/yyyy ' às ' HH:mm", {
              locale: pt,
            })}
          </span>

          {delivery.end_date && (
            <span>
              <strong>Entrega: </strong>
              {format(parseISO(delivery.end_date), "dd/MM/yyyy ' às ' HH:mm", {
                locale: pt,
              })}
            </span>
          )}
        </div>
      )}

      {delivery.signature_id && (
        <div>
          <strong>Assinatura do destinatário</strong>

          <img src={delivery.signature_id} alt="Assinatura do Destinatário" />
        </div>
      )}
    </Container>
  );
}

Details.propTypes = {
  delivery: PropTypes.shape({
    product: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      address: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.number.isRequired,
    }),
    end_date: PropTypes.string,
    start_date: PropTypes.string,
    signature_id: PropTypes.number,
  }).isRequired,
};
