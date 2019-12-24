import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

const TextInput = props => {
  const { name, label, ...rest } = props;
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      parseValue: inputRef => {
        return inputRef.value;
      },
      path: 'state.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input ref={ref} {...rest} />
      {error && <span>{error}</span>}
    </Container>
  );
};

TextInput.defaultProps = {
  label: '',
};

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextInput;
