import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export const PaginationButton = styled.button`
  width: 142px;
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

  &[disabled] {
    background: #ccc;
    cursor: not-allowed;
  }

  &:not([disabled]):hover {
    background: ${lighten(0.05, '#7d40e7')};
  }
`;
