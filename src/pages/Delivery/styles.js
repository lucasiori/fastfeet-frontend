import styled from 'styled-components';
import { lighten } from 'polished';
import { PageHeader } from '~/pages/_layout/default/styles';

export const DeliveryPageHeader = styled(PageHeader)`
  div > input {
    @media screen and (max-width: 630px) {
      width: 100%;
    }
  }

  div > a:last-child {
    @media screen and (min-width: 631px) and (max-width: 815px) {
      width: 100%;
      margin-top: 20px;
    }

    @media screen and (min-width: 491px) and (max-width: 630px) {
      margin-top: 20px;
    }

    @media screen and (max-width: 490px) {
      width: 100%;
      margin-top: 20px;
    }
  }
`;

export const ProblemsFilter = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto 0 30px !important;

  @media screen and (max-width: 630px) {
    margin: 20px 0 0 !important;
  }

  button {
    width: 280px;
    color: #fff;
    background: ${(props) =>
      props.active ? '#7d40e7' : lighten(0.2, '#7d40e7')};
  }

  svg {
    position: relative !important;
    left: 0 !important;
  }
`;

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
