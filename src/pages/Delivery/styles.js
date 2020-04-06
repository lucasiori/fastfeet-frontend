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

  th#recipientColumn,
  th#deliverymanColumn {
    min-width: 200px;
  }

  th#cityColumn {
    min-width: 100px;
  }
`;

export const Status = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 30px;
  background: ${(props) => props.background};
  font-weight: bold;
  color: ${(props) => props.color};
  font-size: 14px;
  text-transform: uppercase;
  padding: 2px 10px;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.color};
    margin-right: 5px;
  }
`;
