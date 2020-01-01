import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '~/components';
import { Container, BodyRow, Wrapper } from './styles';

const data = Array(10)
  .fill(0)
  .map((_, id) => ({
    name: 'João da Silva',
    email: 'email@email.com',
    age: 25,
    id: `${id}`,
  }));
const numberOfPages = 10;
const currentPage = 1;
const onPageChange = () => {};

const Students = () => {
  return (
    <Wrapper>
      <Container>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <BodyRow key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>
                <Link to={`/students/${row.id}`}>editar</Link>
                <span onClick={() => {}}>apagar</span>
              </td>
            </BodyRow>
          ))}
        </tbody>
      </Container>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        onPageClick={onPageChange}
      />
    </Wrapper>
  );
};

export default Students;
