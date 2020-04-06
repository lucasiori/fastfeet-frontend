import React, { useState, useRef, useEffect } from 'react';
import { Input, useField } from '@rocketseat/unform';
import ReactInputMask from 'react-input-mask';

export default function ZipCodeInput() {
  const { defaultValue, registerField } = useField('zip_code');

  const [zipCode, setZipCode] = useState(defaultValue);

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
