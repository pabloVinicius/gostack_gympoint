import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & label {
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #444;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  & span {
    font-size: 0.75rem;
    margin-top: 0.3125rem;
    color: orangered;
  }
`;

export const selectCustomStyles = {
  container: base => ({
    ...base,
    width: '100%',
    borderRadius: '0.25rem !important',
  }),
  control: base => ({
    ...base,
    minHeight: '2.9375em !important',
    height: '2.9375em !important',
    borderRadius: '0.25rem !important',
    border: '0.0625rem solid #ddd',
    ':hover': {
      border: '0.0625rem solid #ddd',
    },
    boxShadow: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    color: '#444',
    ':hover': {
      color: '#444',
    },
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  input: base => ({
    ...base,
    fontSize: '1rem',
    fontFamily: 'Roboto',
  }),
};
