import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, TableButton } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

const data = Array(10)
  .fill(0)
  .map((_, id) => ({
    student: 'João José',
    plan: 'Standard',
    begin: '25 de setembro de 2005',
    end: '26 de setembro de 2005',
    active: id % 2 === 0,
    id: `${id}`,
  }));
const numberOfPages = 10;
const currentPage = 1;
const onPageChange = () => {};

const Registrations = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Gerenciando matrículas</h1>
        <TableButton icon="plus" colorType="primary">
          Cadastrar
        </TableButton>
      </Header>
      <Container>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <BodyRow key={row.id}>
              <td>{row.student}</td>
              <td>{row.plan}</td>
              <td>{row.begin}</td>
              <td>{row.end}</td>
              <td>{row.active ? 'Sim' : 'Não'}</td>
              <td>
                <Link to={`/plans/${row.id}`}>editar</Link>
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

export default Registrations;
