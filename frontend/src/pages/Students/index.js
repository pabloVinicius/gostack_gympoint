/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, TableButton, SearchBar, Spinner } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

import api from '~/services/api';

const Students = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [search, setSearch] = useState('');
  const [searchTemp, setSearchTemp] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get('students', {
        params: {
          page: page - 1,
          perPage: 10,
          q: search,
        },
      });

      setData(response.data.students);
      setPagesCount(response.data.pages);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, [page, search]);

  useEffect(() => {
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setSearch(searchTemp);
    }, 700);
    setSearchTimeout(timeout);
  }, [searchTemp]);

  const handleDelete = id => {
    const confirmed = window.confirm('Tem certeza que deseja deletar?');
    if (confirmed) {
      alert(`Delete: ${id}`);
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Gerenciando alunos</h1>
        <div>
          <Link to="/students/new">
            <TableButton icon="plus" colorType="primary">
              Cadastrar
            </TableButton>
          </Link>
          <SearchBar
            onChange={e => setSearchTemp(e.target.value)}
            value={searchTemp}
            placeholder="Buscar aluno por nome"
          />
        </div>
      </Header>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                    <span onClick={() => handleDelete(row.id)}>apagar</span>
                  </td>
                </BodyRow>
              ))}
            </tbody>
          </Container>
          <Pagination
            numberOfPages={pagesCount}
            currentPage={page}
            onPageClick={value => setPage(value)}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Students;
