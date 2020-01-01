import styled from 'styled-components';

export const Container = styled.table`
  background-color: #fff;
  border-radius: 0.25rem;
  width: 100%;
  padding: 1.875rem;

  & th {
    color: #444;
    font-weight: bold;
    font-size: 1rem;
    text-align: start;
    line-height: 1.1875rem;
    margin-bottom: 1.25rem;

    &:nth-child(3) {
      text-align: center;
    }
  }
`;

export const BodyRow = styled.tr`
  color: #666;
  font-size: 1rem;
  line-height: 1.25rem;

  & td {
    padding-top: 1rem;

    &:last-child {
      text-align: end;
    }

    &:nth-child(3) {
      text-align: center;
    }
  }

  &:not(:last-child) td {
    padding-bottom: 1rem;
    border-bottom: 0.0625rem solid #eee;
  }

  &:first-child td {
    padding-top: 1.25em;
  }

  a {
    color: #4d85ee;
    font-size: 0.9375rem;
    line-height: 1.125rem;
    margin-right: 1.4375rem;
  }

  span {
    color: #de3b3b;
    font-size: 0.9375rem;
    line-height: 1.125rem;
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 75rem;

  & table {
    margin-bottom: 1.25rem;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    color: #444444;
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
`;
