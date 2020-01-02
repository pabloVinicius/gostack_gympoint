import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 22.5rem;
  background: #ffffff;
  border-radius: 0.25rem;
  height: auto;
  min-height: fit-content;
  padding: 3.125rem 1.875rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.875rem;

  & img {
    width: 6.3125rem;
    height: 3.3125rem;
    object-fit: contain;
    margin-bottom: 0.73125rem;
  }

  & h1 {
    font-size: 1.8625rem;
    color: #ee4d64;
    line-height: 2.1875rem;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  & > div {
    :not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }

  margin-bottom: 0.9375rem;
`;
