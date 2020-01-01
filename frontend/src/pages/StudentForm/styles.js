import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 56.25rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  & > h1 {
    font-size: 1.5rem;
    color: #444;
    line-height: 1.75rem;
    font-weight: bold;
  }

  & > div {
    display: flex;
    & > button:first-of-type {
      margin-right: 1rem;
    }
  }
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 0.25rem;
  padding: 1.875rem;
`;

export const FormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > div {
    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }

    &:last-child {
      display: flex;

      & > div:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;
