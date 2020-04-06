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

  th#nameColumn {
    min-width: 200px;
  }

  th#addressColumn {
    min-width: 250px;
  }
`;
