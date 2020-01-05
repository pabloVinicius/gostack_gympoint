/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pagination, HelpOrderModal, Spinner } from '~/components';
import { Container, BodyRow, Wrapper, Header } from './styles';

import api from '~/services/api';

const HelpOrders = () => {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getHelpOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('help-orders', {
        params: {
          page: page - 1,
          perPage: 10,
        },
      });

      setData(response.data.helpOrders);
      setPagesCount(response.data.pages);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHelpOrders();
  }, [page]);

  const handleAnswerSubmit = async answer => {
    try {
      await api.put(`help-orders/${selected.id}`, { answer });
      toast.success('Pedido respondido com sucesso!');
      getHelpOrders();
      setSelected(null);
    } catch (err) {
      toast.error('Erro ao responder o pedido de auxílio');
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Pedidos de auxílio</h1>
      </Header>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <BodyRow key={row.id}>
                  <td>{row.student.name}</td>
                  <td>
                    <span onClick={() => setSelected(row)}>responder</span>
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
      {selected && (
        <HelpOrderModal
          question={selected.question}
          onClose={() => setSelected(null)}
          onSubmit={handleAnswerSubmit}
        />
      )}
    </Wrapper>
  );
};

export default HelpOrders;
