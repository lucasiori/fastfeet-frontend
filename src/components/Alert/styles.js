import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  justify-content: center;
  border-radius: 4px;
  padding: 20px;

  h3 {
    font-weight: bold;
    color: #444;
    font-size: 24px;
    margin-bottom: 20px;
  }

  span {
    color: #999;
    font-size: 16px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    margin-top: 20px;
  }
`;

export const CancelButton = styled.button.attrs({
  type: 'button',
})`
  width: 90px;
  background: #fb6f73;
  padding: 0px 20px;
  margin-right: 15px;

  &:hover {
    background: ${lighten(0.05, '#fb6f73')} !important;
  }
`;

export const ConfirmButton = styled.button.attrs({
  type: 'button',
})`
  width: 90px;
  padding: 0px 20px;
`;
