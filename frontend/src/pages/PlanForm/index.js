import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { TableButton, TextInput } from '~/components';

import { Wrapper, Header, Container, FormContent } from './styles';

const schema = yup.object().shape({
  title: yup.string().required('O título é obrigatório'),
  duration: yup.number().required('Informe a quantidade de meses'),
  price: yup.string().required('Informe o preço mensal'),
});

const PlanForm = ({ match }) => {
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';

  return (
    <Wrapper>
      <Form
        schema={schema}
        onSubmit={e => {
          console.log(e);
        }}
      >
        <Header>
          <h1>{isNew ? 'Cadastro de plano' : 'Edição de plano'}</h1>
          <div>
            <Link to="/plans">
              <TableButton colorType="secondary" type="button" icon="back">
                Voltar
              </TableButton>
            </Link>
            <TableButton type="submit" icon="check">
              Salvar
            </TableButton>
          </div>
        </Header>
        <Container>
          <FormContent>
            <TextInput label="Título do plano" type="text" name="title" />
            <div>
              <TextInput
                label="Duração (em meses)"
                name="duration"
                type="number"
                min="1"
              />
              <TextInput type="number" label="Preço mensal" name="price" />
              <TextInput
                label="Preço total"
                name="totalPrice"
                value="abc"
                readOnly
              />
            </div>
          </FormContent>
        </Container>
      </Form>
    </Wrapper>
  );
};

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default PlanForm;
