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

  > div {
    display: flex;
    flex-direction: column;

    > strong {
      color: #444;
      margin-bottom: 8px;
    }
  }

  div + div {
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 10px;
  }

  span {
    font-size: 16px;
    color: #666;
    margin: 3px 0;

    strong {
      color: #666;
    }
  }

  img {
    max-height: 100px;
    margin-top: 6px;
  }
`;
