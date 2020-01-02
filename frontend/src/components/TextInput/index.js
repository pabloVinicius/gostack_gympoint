import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const TextInput = props => {
  const { name, label, error, ...rest } = props;

  return (
    <Container readOnly={rest.readOnly}>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} {...rest} />
      {error && <span>{error}</span>}
    </Container>
  );
};

TextInput.defaultProps = {
  label: '',
  error: undefined,
};

TextInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextInput;
