import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 28.125em;
  padding: 1.875em;
  height: auto;
  background: white;
  border-radius: 0.25rem;

  & label {
    font-size: 0.875rem;
    line-height: 1rem;
    color: #444;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  & p {
    font-size: 1rem;
    line-height: 1.625rem;
    color: #666;
  }

  & div {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
  }

  & textarea {
    font-family: inherit;
    resize: none;
    width: 100%;
    height: 7.9375rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid #ddd;
    font-size: 1rem;
    line-height: 1.1875em;
    padding: 0.8125rem 0.9375rem;
  }
`;
