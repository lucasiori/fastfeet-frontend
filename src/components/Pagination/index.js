import React from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import { Container, PaginationButton } from './styles';

export default function Pagination({
  itensAmount,
  currentPage,
  handlePaginationPrev,
  handlePaginationNext,
}) {
  return (
    <Container>
      <PaginationButton
        style={{ paddingRight: '35px' }}
        disabled={currentPage === 1 ? 1 : 0}
        onClick={handlePaginationPrev}
      >
        <IoMdArrowDropleft size={26} color="#fff" />
        Anterior
      </PaginationButton>
      <PaginationButton
        style={{ paddingLeft: '35px' }}
        disabled={Math.ceil(itensAmount / 10) <= currentPage ? 1 : 0}
        onClick={handlePaginationNext}
      >
        Próximo
        <IoMdArrowDropright size={26} color="#fff" />
      </PaginationButton>
    </Container>
  );
}

Pagination.propTypes = {
  itensAmount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePaginationPrev: PropTypes.func.isRequired,
  handlePaginationNext: PropTypes.func.isRequired,
};
