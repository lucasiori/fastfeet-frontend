import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactInputMask from 'react-input-mask';

export default function ZipCodeInput({ defaultValue }) {
  const { registerField } = useField('zip_code');

  const [zipCode, setZipCode] = useState('');

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'zip_code',
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setZipCode(defaultValue);
  }, [defaultValue]);

  return (
    <ReactInputMask
      mask="99999-999"
      maskChar=" "
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
    >
      {() => <Input name="zip_code" type="text" />}
    </ReactInputMask>
  );
}

ZipCodeInput.propTypes = {
  defaultValue: PropTypes.string,
};

ZipCodeInput.defaultProps = {
  defaultValue: '',
};
