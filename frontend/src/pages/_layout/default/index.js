import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '~/components';
import { Wrapper, Content } from './styles';

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
