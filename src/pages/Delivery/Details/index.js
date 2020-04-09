import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatZipCode } from '~/utils/format';

import { Status } from '../styles';
import { Container } from './styles';

export default function Details({ delivery }) {
  return (
    <Container>
      <h3>Informações da encomenda</h3>

      <div>
        <strong>Status</strong>
        <span>
          <Status
            color={delivery.state.labelColor}
            background={delivery.state.background}
          >
            {delivery.state.description}
          </Status>
        </span>
      </div>

      <div>
        <strong>Produto</strong>
        <span>{delivery.product}</span>
      </div>

      <div>
        <strong>Endereço de entrega</strong>
        <span>
          {delivery.recipient.address}, {delivery.recipient.address_number}
        </span>
        <span>
          {delivery.recipient.city} - {delivery.recipient.state}
        </span>
        <span>{formatZipCode(delivery.recipient.zip_code)}</span>
      </div>

      {(delivery.start_date || delivery.end_date || delivery.canceled_at) && (
        <div>
          <strong>Datas</strong>
          {delivery.start_date && (
            <span>
              <strong>Retirada: </strong>
              {format(
                parseISO(delivery.start_date),
                "dd/MM/yyyy ' às ' HH:mm",
                {
                  locale: pt,
                }
              )}
            </span>
          )}

          {delivery.end_date && (
            <span>
              <strong>Entrega: </strong>
              {format(parseISO(delivery.end_date), "dd/MM/yyyy ' às ' HH:mm", {
                locale: pt,
              })}
            </span>
          )}

          {delivery.canceled_at && (
            <span>
              <strong>Cancelamento: </strong>
              {format(
                parseISO(delivery.canceled_at),
                "dd/MM/yyyy ' às ' HH:mm",
                {
                  locale: pt,
                }
              )}
            </span>
          )}
        </div>
      )}

      {delivery.signature && (
        <div>
          <strong>Assinatura do destinatário</strong>

          <img src={delivery.signature.url} alt="Assinatura do Destinatário" />
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
      address_number: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.number.isRequired,
    }),
    signature: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    end_date: PropTypes.string,
    start_date: PropTypes.string,
    canceled_at: PropTypes.string,
    signature_id: PropTypes.number,
    state: PropTypes.shape({
      labelColor: PropTypes.string,
      background: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};
