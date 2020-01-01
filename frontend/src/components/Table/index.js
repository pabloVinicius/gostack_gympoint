import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, BodyRow, Wrapper } from './styles';
import Pagination from '../Pagination';

const Table = ({
  rows,
  data,
  editBaseLink,
  onRowDelete,
  numberOfPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <Wrapper>
      <Container>
        <thead>
          <tr>
            {rows.map(row => (
              <th key={row}>{row}</th>
            ))}
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
                <Link to={`/${editBaseLink}/${row.id}`}>editar</Link>
                <span onClick={() => onRowDelete(row.id)}>apagar</span>
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

Table.defaultProps = {
  rows: ['NOME', 'E-MAIL', 'IDADE'],
  data: Array(10)
    .fill(0)
    .map((_, id) => ({
      name: 'João da Silva',
      email: 'email@email.com',
      age: 25,
      id: `${id}`,
    })),
  editBaseLink: 'students',
  onRowDelete: id => {
    console.log('id', id);
  },
  numberOfPages: 10,
  currentPage: 1,
  onPageChange: () => {},
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      age: PropTypes.number,
      id: PropTypes.string,
    })
  ),
  editBaseLink: PropTypes.string,
  onRowDelete: PropTypes.func,
  numberOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Table;
