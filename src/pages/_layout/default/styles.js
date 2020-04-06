import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #f5f5f5;
`;

export const Container = styled.main`
  width: 90%;
  max-width: 1200px;
  height: 100%;
  padding: 50px 0;
  margin: 0 auto;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: bold;
    font-size: 24px;
    color: #444;
  }

  div {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    > svg {
      position: absolute;
      left: 15px;

      @media screen and (max-width: 450px) {
        top: 10px;
      }
    }

    input {
      width: 240px;
      height: 36px;
      font-size: 14px;
      padding: 5px 10px 5px 42px;

      &:focus ~ svg {
        color: #7d40e7 !important;
      }

      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }
  }
`;

export const Button = styled.button`
  width: 142px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }

  &:not([disabled]):hover {
    background: ${lighten(0.05, '#7d40e7')};
  }

  @media screen and (max-width: 450px) {
    margin-top: 10px;
  }
`;

export const Table = styled.table`
  width: 100%;
  font-size: 16px;
  border-spacing: 0 20px;
  text-align: left;

  th {
    color: #444;
    padding: 0 15px;
  }

  tbody > tr {
    height: 57px;
    background: #fff;
  }

  td {
    color: #666;
    padding: 10px 15px;
    border-radius: 4px;
  }

  td:last-child {
    width: 1%;
  }
`;

export const MenuButton = styled.button`
  position: relative;
  display: block;
  border: none;
  background: transparent;
  margin-left: 15px;
`;

export const MenuContent = styled.div`
  position: absolute;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  width: 150px;
  background: #fff;
  border-radius: 4px;
  padding: 8px 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  left: calc(50% - 75px);
  z-index: 99;

  &::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    background: transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
    top: -10px;
    left: calc(50% - 10px);
  }

  ul {
    width: 100%;
  }
`;

export const MenuItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #999;
  padding: 8px 0;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }

  + li {
    border-top: 1px solid #eee;
  }
`;
