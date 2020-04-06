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
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fb6f91;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  padding: 0px 20px;
  margin-right: 15px;
  transition: background 200ms;

  &:hover {
    background: ${lighten(0.05, '#FB6F91')};
  }
`;

export const ConfirmButton = styled.button.attrs({
  type: 'button',
})`
  width: 90px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  padding: 0px 20px;
  transition: background 200ms;

  &:hover {
    background: ${lighten(0.05, '#7d40e7')};
  }
`;
