import styled, { keyframes } from 'styled-components';

// adapted from https://loading.io

const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ee4d64;
    border-color: #ee4d64 transparent #ee4d64 transparent;
    animation: ${ringAnimation} 1.2s linear infinite;
  }
`;
