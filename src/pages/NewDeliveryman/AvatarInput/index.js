import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdImage } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ defaultValue }) {
  const { registerField } = useField('avatar');

  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState(undefined);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    setFile(defaultValue && defaultValue.id);
    setPreview(defaultValue && defaultValue.url);
  }, [defaultValue]);

  async function handleChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      toast.error('Erro ao realizar upload da imagem');
    }
  }

  function handleRemoveImage() {
    setFile(undefined);
    setPreview(undefined);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <div>
            <MdImage size={40} color="#ddd" />
            <span>Adicionar foto</span>
          </div>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>

      {preview && (
        <button type="button" onClick={handleRemoveImage}>
          Remover foto
        </button>
      )}
    </Container>
  );
}

AvatarInput.propTypes = {
  defaultValue: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }),
};

AvatarInput.defaultProps = {
  defaultValue: undefined,
};
