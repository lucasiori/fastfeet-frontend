import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

import { Add, Back } from './styles';

export function AddButton({ url }) {
  return (
    <Link to={url}>
      <Add type="button">
        <MdAdd size={18} color="#fff" />
        Cadastrar
      </Add>
    </Link>
  );
}

export function BackButton({ url }) {
  return (
    <Link to={url}>
      <Back type="button">
        <IoIosArrowBack size={18} color="#fff" />
        VOLTAR
      </Back>
    </Link>
  );
}

AddButton.propTypes = {
  url: PropTypes.string.isRequired,
};

BackButton.propTypes = {
  url: PropTypes.string.isRequired,
};
