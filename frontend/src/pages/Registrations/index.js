/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import pt from 'date-fns/locale/pt';
import { MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Pagination, TableButton, Spinner } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

import api from '~/services/api';

const Registrations = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRegistrations = async () => {
    setLoading(true);
    try {
      const response = await api.get('registrations', {
        params: {
          page: page - 1,
          perPage: 10,
        },
      });

      setData(response.data.registrations);
      setPagesCount(response.data.pages);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegistrations();
  }, [page]);

  const handleDelete = async id => {
    const confirmed = window.confirm('Tem certeza que deseja deletar?');
    if (confirmed) {
      try {
        await api.delete(`registrations/${id}`);
        toast.success('Plano deletado com sucesso!');
        getRegistrations();
      } catch (err) {
        toast.error('Erro ao deletar plano');
      }
    }
  };

  const formatDate = iso => {
    return format(parseISO(iso), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  };

  return (
    <Wrapper>
      <Header>
        <h1>Gerenciando matrículas</h1>
        <Link to="/registrations/new">
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
                  <td>{row.student.name}</td>
                  <td>{row.plan.title}</td>
                  <td>{formatDate(row.start_date)}</td>
                  <td>{formatDate(row.end_date)}</td>
                  <td>
                    <MdCheckCircle
                      color={row.active ? '#42cb59' : '#ddd'}
                      size={20}
                    />
                  </td>
                  <td>
                    <Link to={`/registrations/${row.id}`}>editar</Link>
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

export default Registrations;
