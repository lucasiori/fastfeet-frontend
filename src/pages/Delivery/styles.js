import styled from 'styled-components';
import { lighten } from 'polished';

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;

  > div {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    @media screen and (max-width: 450px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    a:last-child {
      @media screen and (max-width: 815px) {
        width: 100%;
        margin-top: 20px;
      }
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
    width: 100%;
    margin: 20px 0 0 !important;
  }

  button {
    width: 280px;
    background: ${(props) =>
      props.active ? '#7d40e7' : lighten(0.2, '#7d40e7')};
  }

  svg {
    position: relative !important;
    left: 0 !important;
  }
`;

export const Button = styled.button`
  width: 142px;
  height: 36px;
  justify-content: space-between;
  text-transform: uppercase;
  padding: 0px 20px;

  @media screen and (max-width: 450px) {
    margin-top: 10px;
  }
`;

export const PageContent = styled.section`
  margin-top: 30px;
  overflow: auto;

  th#recipientColumn,
  th#deliverymanColumn {
    min-width: 200px;
  }

  th#cityColumn {
    min-width: 100px;
  }
`;
