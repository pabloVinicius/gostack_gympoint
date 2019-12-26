import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const PageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.875rem;
  height: 2.875rem;
  font-size: 1.25rem;
  font-weight: bold;
  border: 0.0625rem solid #ddd;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  ${props =>
    props.selected
      ? css`
          color: #fff;
          background: #ee4d64;
        `
      : css`
          color: #666;
          background: #fff;
        `}
`;
