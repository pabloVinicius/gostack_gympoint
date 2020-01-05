import React from 'react';
import AsyncSelect from 'react-select/async';
import CommonSelect from 'react-select';
import PropTypes from 'prop-types';

import { Container, selectCustomStyles } from './styles';

const SelectInput = props => {
  const { name, label, error, async, ...rest } = props;

  const Select = async ? AsyncSelect : CommonSelect;

  return (
    <Container readOnly={rest.readOnly}>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        placeholder=""
        styles={selectCustomStyles}
        name={name}
        cacheOptions
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
};

SelectInput.defaultProps = {
  label: '',
  error: undefined,
  async: false,
};

SelectInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  async: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default SelectInput;
