/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, LogoContainer, HeaderLink } from './styles';

import logo from '~/assets/images/logo.svg';

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
  const path = useMemo(() => new RegExp(history.location.pathname), [
    history.location,
  ]);

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
        <strong>Nome do usuário</strong>
        <span>sair do sistema</span>
      </aside>
    </Container>
  );
};

export default Header;
