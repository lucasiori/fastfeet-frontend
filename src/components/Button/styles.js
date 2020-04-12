import styled from 'styled-components';
import { lighten } from 'polished';

export const Add = styled.button`
  width: 142px;
  background: ${(props) => props.background};
  justify-content: space-between;
  padding: 0px 20px;

  @media screen and (max-width: 450px) {
    margin-top: 10px;
  }
`;

export const Back = styled.button`
  width: 112px;
  background: ${lighten(0.2, '#7d40e7')};
  justify-content: space-between;
  padding: 0px 20px;

  &:hover {
    background: ${lighten(0.2, '#7d40e7')} !important;
  }

  @media screen and (max-width: 450px) {
    margin-top: 10px;
  }
`;
