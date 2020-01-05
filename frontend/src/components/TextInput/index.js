import React from 'react';
import PropTypes from 'prop-types';
import { IMaskMixin } from 'react-imask';

import { Container } from './styles';

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <input {...props} ref={inputRef} />
));

const TextInput = props => {
  const { name, label, error, ...rest } = props;

  return (
    <Container readOnly={rest.readOnly}>
      {label && <label htmlFor={name}>{label}</label>}
      <MaskedInput name={name} {...rest} />
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
