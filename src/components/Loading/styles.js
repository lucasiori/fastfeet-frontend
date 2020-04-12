import styled from 'styled-components';

export const Container = styled.div`
  > svg {
    display: block;
    margin: 50px auto;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    to {
      transform: rotate(0deg);
    }

    from {
      transform: rotate(360deg);
    }
  }
`;
