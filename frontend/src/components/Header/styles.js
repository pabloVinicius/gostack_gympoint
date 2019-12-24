import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background: #fff;
  padding: 0 1.875rem;
  border: 0.0625rem solid #dddddd;

  & > div {
    display: flex;
    align-items: center;
  }

  & > aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > strong {
      font-size: 0.875rem;
      color: #666;
      font-weight: bold;
      line-height: 1rem;
      margin-bottom: 0.25rem;
    }

    & > span {
      cursor: pointer;
      color: #de3b3b;
      font-size: 0.875rem;
      line-height: 1rem;
    }
  }
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.selected ? '#444' : '#999')};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9375rem;

  :not(:last-child) {
    margin-right: 1.25rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.875rem;

  ::after {
    content: '';
    height: 2rem;
    width: 0.0625rem;
    background: #ddd;
    margin-left: 1.875rem;
  }

  & > img {
    width: 2.8125rem;
    height: 1.4375rem;
    object-fit: contain;
    margin-right: 0.8125rem;
  }

  & > a {
    color: #ee4d64;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9375rem;
    line-height: 1.125rem;
  }
`;
