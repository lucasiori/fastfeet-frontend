import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    opacity: 1;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 140px;
      width: 140px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    div {
      width: 140px;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px dashed #ddd;

      span {
        color: #ddd;
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;
      }
    }

    input {
      display: none;
    }
  }

  button {
    width: 140px;
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
    font-size: 13px;
    padding: 0px 20px;
    margin-top: 10px;
    transition: background 200ms;

    &:hover {
      background: ${lighten(0.05, '#FB6F91')};
    }
  }
`;
