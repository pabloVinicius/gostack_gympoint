/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, LogoContainer, HeaderLink } from './styles';

import logo from '~/assets/images/logo.svg';
import { signOut } from '~/store/modules/auth/actions';

const links = [
  {
    name: 'Alunos',
    to: '/students',
  },
  {
    name: 'Planos',
    to: '/plans',
  },
  {
    name: 'Matrículas',
    to: '/registrations',
  },
  {
    name: 'Pedidos de auxílio',
    to: '/help_orders',
  },
];

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const path = useMemo(() => new RegExp(history.location.pathname), [
    history.location,
  ]);

  const userName = useSelector(state => state.user.user.name);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <div>
        <LogoContainer>
          <img src={logo} alt="Logo Gympoint" />
          <Link to="/students">Gympoint</Link>
        </LogoContainer>
        <nav>
          {links.map((el, id) => (
            <HeaderLink key={id} to={el.to} selected={path.test(el.to)}>
              {el.name}
            </HeaderLink>
          ))}
        </nav>
      </div>
      <aside>
        <strong>{userName}</strong>
        <span onClick={handleSignOut}>sair do sistema</span>
      </aside>
    </Container>
  );
};

export default Header;
