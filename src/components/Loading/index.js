import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <AiOutlineLoading size={100} color="#7159c1" />
    </Container>
  );
}
