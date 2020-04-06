import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  padding: 40px 30px;

  form {
    width: 100%;
    margin-top: 25px;

    span {
      color: #fb6f91;
      font-size: 12px;
      font-weight: bold;
      margin-top: 5px;
      white-space: nowrap;
    }
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;

  label {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  disabled: props.loading,
}))`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin: 15px auto 0;
  transition: background 200ms;

  &[disabled] {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background: ${lighten(0.05, '#7d40e7')};
  }
`;
