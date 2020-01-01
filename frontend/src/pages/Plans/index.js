import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, TableButton } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

const data = Array(10)
  .fill(0)
  .map((_, id) => ({
    title: 'Diamond',
    duration: id + 1,
    value: 'R$ 130,00',
    id: `${id}`,
  }));
const numberOfPages = 10;
const currentPage = 1;
const onPageChange = () => {};

const Plans = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Gerenciando planos</h1>
        <TableButton icon="plus" colorType="primary">
          Cadastrar
        </TableButton>
      </Header>
      <Container>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <BodyRow key={row.id}>
              <td>{row.title}</td>
              <td>
                {row?.duration > 1
                  ? `${row?.duration} meses`
                  : `${row?.duration} mês`}
              </td>
              <td>{row.value}</td>
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

export default Plans;
