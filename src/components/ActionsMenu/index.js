import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  display: block;
  border: none;
  background: transparent;
  margin-left: 15px;

  &:hover {
    background: transparent !important;
  }
`;

export const Content = styled.div.attrs({
  className: 'table-actions-menu',
})`
  position: absolute;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  width: 155px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  left: calc(50% - 110px);
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
    left: calc(50% + 25px);
  }

  ul {
    width: 100%;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #999;
  font-weight: normal;
  text-transform: capitalize;
  padding: 8px 0;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }

  + li {
    border-top: 1px solid #eee;
  }
`;
