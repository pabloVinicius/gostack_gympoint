import React, { useState } from 'react';
import { Pagination, HelpOrderModal } from '~/components';
import { Container, BodyRow, Wrapper } from './styles';

const data = Array(10)
  .fill(0)
  .map((_, id) => ({
    student: 'João José',
    id: `${id}`,
  }));
const numberOfPages = 10;
const currentPage = 1;
const onPageChange = () => {};

const HelpOrders = () => {
  const [selected, changeSelected] = useState(null);
  return (
    <Wrapper>
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
              <td>{row.student}</td>
              <td>
                <span onClick={() => changeSelected(row.id)}>responder</span>
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
      {selected && (
        <HelpOrderModal id={selected} onClose={() => changeSelected(null)} />
      )}
    </Wrapper>
  );
};

export default HelpOrders;
