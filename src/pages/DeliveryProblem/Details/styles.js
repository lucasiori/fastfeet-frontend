import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 25px;
  z-index: 99;

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  span {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }
`;
