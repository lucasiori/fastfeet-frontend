import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactSelect from 'react-select';

import { customSelectStyles } from './styles';

export default function StatesSelect({ options, defaultValue }) {
  const { registerField } = useField('state');

  const [state, setState] = useState({ value: '', label: '' });

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'state',
        ref: ref.current,
        path: 'value.label',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setState({ value: defaultValue, label: defaultValue });
  }, [defaultValue]);

  return (
    <>
      <ReactSelect
        options={options}
        isSearchable
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        value={state}
        onChange={(selectedOption) => setState(selectedOption)}
        styles={customSelectStyles}
      />

      <Input
        name="state"
        value={state.label || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

StatesSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
};

StatesSelect.defaultProps = {
  defaultValue: '',
};
