import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Container } from './styles';

const SearchBar = ({ value, onChange, ...rest }) => {
  return (
    <Container>
      <MdSearch size={16} color="#999" />
      <input type="text" value={value} onChange={onChange} {...rest} />
    </Container>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
