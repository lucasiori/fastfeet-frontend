import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';

import api from '~/services/api';

import { AsyncSelect, customSelectStyles } from './styles';

export default function DeliverymenSelect({ defaultValue }) {
  const { registerField } = useField('deliveryman_id');

  const [deliveryman, setDeliveryman] = useState({
    value: undefined,
    label: '',
  });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    async function loadDefaultOptions() {
      const response = await api.get('/deliverymen');

      setDefaultOptions(
        response.data.map((r) => ({
          value: r.id,
          label: r.name,
        }))
      );
    }

    loadDefaultOptions();
  }, []);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'deliveryman_id',
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setDeliveryman(defaultValue);
  }, [defaultValue]);

  const loadOptions = (inputValue, callback) => {
    async function loadDeliverymen() {
      const response = await api.get(`/deliverymen?q=${inputValue}`);

      return response.data.map((r) => ({
        value: r.id,
        label: r.name,
      }));
    }

    setTimeout(async () => {
      const deliverymen = await loadDeliverymen();

      callback(deliverymen);
    }, 1000);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        loadingMessage={() => 'Carregando...'}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        value={deliveryman}
        onChange={(selectedOption) => setDeliveryman(selectedOption)}
        styles={customSelectStyles}
      />

      <Input
        name="deliveryman_id"
        value={deliveryman.value || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

DeliverymenSelect.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

DeliverymenSelect.defaultProps = {
  defaultValue: { value: undefined, label: '' },
};
