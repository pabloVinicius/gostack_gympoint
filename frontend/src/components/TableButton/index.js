import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';

import { Container } from './styles';

const TableButton = props => {
  const { children, colorType, icon, ...rest } = props;

  const icons = {
    plus: FiPlus,
    check: MdCheck,
    back: MdKeyboardArrowLeft,
  };

  const MyIcon = icons[icon];

  return (
    <Container {...rest} colorType={colorType}>
      <MyIcon color="#fff" size={20} />
      {children}
    </Container>
  );
};

TableButton.defaultProps = {
  colorType: 'primary',
  icon: 'plus',
};

TableButton.propTypes = {
  colorType: PropTypes.string,
  icon: PropTypes.oneOf(['plus', 'check', 'back']),
  children: PropTypes.string.isRequired,
};

export default TableButton;
