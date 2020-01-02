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

  & input {
    border: 0.0625rem solid #ddd;
    border-radius: 0.25rem;
    background: ${props => (props.readOnly ? '#F5F5F5' : '#fff')};
    font-size: 1rem;
    line-height: 1.1875rem;
    padding: 0.8125rem 0.9375rem;

    ::placeholder {
      color: #999;
    }
  }

  & span {
    font-size: 0.75rem;
    margin-top: 0.3125rem;
    color: orangered;
  }
`;
