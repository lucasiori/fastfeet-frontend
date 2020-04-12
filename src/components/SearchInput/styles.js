import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 240px;

  :focus-within svg {
    color: #7d40e7 !important;
  }

  svg {
    position: absolute;
    left: 15px;
    top: calc(50% - 9px);
  }

  input {
    width: 100%;
    height: 36px;
    font-size: 14px;
    padding: 5px 10px 5px 42px;
  }
`;
