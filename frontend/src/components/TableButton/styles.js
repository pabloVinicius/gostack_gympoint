import styled from 'styled-components';

export const Container = styled.button`
  outline: none;
  border: none;
  box-shadow: none;

  display: flex;
  padding: 0 1rem;
  height: 2.25rem;
  border-radius: 0.25rem;

  align-items: center;

  font-size: 0.875rem;
  line-height: 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;

  background-color: ${props => {
      switch (props.colorType) {
        case 'primary':
          return '#EE4D64';
        default:
          return '#CCCCCC';
      }
    }}
    & > svg {
    margin-right: 0.5rem;
  }
`;
