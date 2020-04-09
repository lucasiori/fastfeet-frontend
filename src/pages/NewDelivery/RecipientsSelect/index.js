import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';

import api from '~/services/api';

import { AsyncSelect, customSelectStyles } from './styles';

export default function RecipientsSelect({ defaultValue }) {
  const { registerField } = useField('recipient_id');

  const [recipient, setRecipient] = useState({ value: undefined, label: '' });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    async function loadDefaultOptions() {
      const response = await api.get('/recipients');

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
        name: 'recipient_id',
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setRecipient(defaultValue);
  }, [defaultValue]);

  const loadOptions = (inputValue, callback) => {
    async function loadRecipients() {
      const response = await api.get(`/recipients?q=${inputValue}`);

      return response.data.map((r) => ({
        value: r.id,
        label: r.name,
      }));
    }

    setTimeout(async () => {
      const recipients = await loadRecipients();

      callback(recipients);
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
        value={recipient}
        onChange={(selectedOption) => setRecipient(selectedOption)}
        styles={customSelectStyles}
      />

      <Input
        name="recipient_id"
        value={recipient.value || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

RecipientsSelect.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

RecipientsSelect.defaultProps = {
  defaultValue: { value: undefined, label: '' },
};
