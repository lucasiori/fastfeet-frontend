import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function SearchInput({
  placeholder,
  value,
  onChange,
  onKeyPress,
}) {
  return (
    <Container>
      <MdSearch size={18} color="#999" />

      <input
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  placeholder: '',
};
