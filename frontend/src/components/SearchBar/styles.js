import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 0 1rem;
  align-items: center;
  height: 2.25rem;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 0.0625rem solid #ddd;
  width: 14.8125rem;

  & > svg {
    margin-right: 0.5rem;
  }

  & > input {
    background: transparent;
    border: none;
    color: #999;
    font-size: 0.875rem;
  }
`;
