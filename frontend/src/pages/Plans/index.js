/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, TableButton, Spinner } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

import api from '~/services/api';

const Plans = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPlans = async () => {
    setLoading(true);
    try {
      const response = await api.get('plans', {
        params: {
          page: page - 1,
          perPage: 10,
        },
      });

      setData(response.data.plans);
      setPagesCount(response.data.pages);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, [page]);

  const handleDelete = id => {
    const confirmed = window.confirm('Tem certeza que deseja deletar?');
    if (confirmed) {
      alert(`Delete: ${id}`);
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Gerenciando planos</h1>
        <Link to="/plans/new">
          <TableButton icon="plus" colorType="primary">
            Cadastrar
          </TableButton>
        </Link>
      </Header>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                  <td>{row.textualPrice}</td>
                  <td>
                    <Link to={`/plans/${row.id}`}>editar</Link>
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

export default Plans;
