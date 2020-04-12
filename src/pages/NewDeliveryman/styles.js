import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 625px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    min-width: max-content;
    display: flex;
    flex: 1;

    @media screen and (max-width: 625px) {
      margin-bottom: 20px;
    }
  }

  div {
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  width: 112px;
  justify-content: space-between;
  padding: 0px 20px;
`;

export const PageContent = styled.section`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  margin-top: 30px;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;

  label {
    margin-bottom: 10px;
  }

  span {
    color: #fb6f73;
    font-size: 12px;
    font-weight: bold;
    margin-top: 5px;
    white-space: nowrap;
  }
`;
