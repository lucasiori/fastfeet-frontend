import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';

import { signOut } from '~/store/modules/auth/actions';

import history from '~/services/history';

import { Content } from '~/components/ActionsMenu';
import {
  Container,
  HeaderContent,
  BurguerMenu,
  NavLink,
  Logout,
} from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const [pages, setPages] = useState([
    { path: '/deliveries', label: 'ENCOMENDAS', current: true },
    { path: '/deliverymen', label: 'ENTREGADORES', current: false },
    { path: '/recipients', label: 'DESTINATÁRIOS', current: false },
    { path: '/problems', label: 'PROBLEMAS', current: false },
  ]);

  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const [burguerMenuVisible, setBurguerMenuVisible] = useState(false);

  useEffect(() => {
    setPages(
      pages.map((page) => ({
        ...page,
        current: currentPath.includes(page.path),
      }))
    );
  }, [currentPath]); // eslint-disable-line

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <HeaderContent>
        <nav>
          <img src={logo} alt="FastFeet" width={150} />

          <BurguerMenu
            onClick={() => setBurguerMenuVisible(!burguerMenuVisible)}
          >
            <GiHamburgerMenu size={25} color="#7d40e7" />

            <Content hidden={burguerMenuVisible ? 0 : 1}>
              <ul>
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavLink
                      to={page.path}
                      current={page.current ? 1 : 0}
                      onClick={() => setCurrentPath(page.path)}
                    >
                      {page.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Content>
          </BurguerMenu>

          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  current={page.current ? 1 : 0}
                  onClick={() => setCurrentPath(page.path)}
                >
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <aside>
          <strong>{profile.name}</strong>
          <Logout onClick={handleSignOut}>sair do sistema</Logout>
        </aside>
      </HeaderContent>
    </Container>
  );
}
