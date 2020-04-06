import styled from 'styled-components';

export const Content = styled.section`
  margin-top: 30px;
  overflow: auto;

  @keyframes loading {
    to {
      transform: rotate(0deg);
    }

    from {
      transform: rotate(360deg);
    }
  }

  > svg {
    display: block;
    margin: 50px auto;
    animation: loading 1s linear infinite;
  }

  th#nameColumn,
  th#emailColumn {
    min-width: 200px;
  }
`;
