import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

export const HeaderContent = styled.div`
  width: 90%;
  max-width: 1360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      display: block;
      border-right: 1px solid #ddd;
      padding: 5px 30px 5px 0;
      margin-right: 30px;
    }

    > ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px 0;

      @media screen and (max-width: 920px) {
        display: none;
      }

      li {
        margin: 0 10px;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;

    @media screen and (max-width: 420px) {
      margin-top: 15px;
      align-items: center;
    }

    strong {
      font-size: 14px;
      color: #666;
    }
  }
`;

export const BurguerMenu = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;

  &:hover,
  &:active {
    background: transparent;
  }

  @media screen and (min-width: 921px) {
    display: none;
  }

  > div {
    top: calc(100% + 2px);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    text-align: start;

    li {
      width: 100%;
      padding: 7px 0;

      & + li {
        border-top: 1px solid #eee;
      }
    }
  }
`;

export const NavLink = styled(Link)`
  font-weight: bold;
  color: ${(props) => (props.current ? '#000' : '#999')};
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.12s;

  &:hover,
  &:active {
    color: #000;
  }
`;

export const Logout = styled.span`
  display: block;
  margin-top: 5px;
  color: #de3b3b;
  text-transform: lowercase;
  cursor: pointer;
`;
