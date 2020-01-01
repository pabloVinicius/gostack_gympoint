import React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { TableButton, TextInput } from '~/components';

import { Wrapper, Header, Container, FormContent } from './styles';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('O e-email é obrigatório'),
  age: yup
    .number()
    .min(1)
    .required('Informe a idade'),
  weight: yup.number().required('Informe o peso.'),
  height: yup.number().required('Informe a altura'),
});

const StudentForm = () => {
  const {
    location: { pathname },
  } = useHistory();
  const isNew = pathname.split('/').slice(-1)[0] === 'new';

  return (
    <Wrapper>
      <Form
        schema={schema}
        onSubmit={e => {
          console.log(e);
        }}
      >
        <Header>
          <h1>{isNew ? 'Cadastro de aluno' : 'Edição de aluno'}</h1>
          <div>
            <TableButton colorType="secondary" type="submit" icon="back">
              Voltar
            </TableButton>
            <TableButton icon="check">Salvar</TableButton>
          </div>
        </Header>
        <Container>
          <FormContent>
            <TextInput
              label="Nome completo"
              placeholder="John Doe"
              type="text"
              name="name"
            />
            <TextInput
              label="Endereço de e-mail"
              type="email"
              placeholder="exemplo@email.com"
              name="email"
            />
            <div>
              <TextInput
                label="Idade"
                name="age"
                mask={Number}
                scale={0}
                min={0}
              />
              <TextInput
                label="Peso (em kg)"
                name="weight"
                mask={Number}
                scale={2}
                min={0}
                padFractionalZeros
              />
              <TextInput
                label="Altura"
                name="height"
                mask={Number}
                scale={2}
                min={0}
                padFractionalZeros
              />
            </div>
          </FormContent>
        </Container>
      </Form>
    </Wrapper>
  );
};

export default StudentForm;
