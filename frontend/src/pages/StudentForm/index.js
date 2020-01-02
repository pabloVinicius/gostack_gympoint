import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const StudentForm = ({ match }) => {
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      weight: '',
      height: '',
    },
    validationSchema: schema,
    onSubmit: values => console.log('values', values),
  });

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Header>
          <h1>{isNew ? 'Cadastro de aluno' : 'Edição de aluno'}</h1>
          <div>
            <Link to="/students">
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
            <TextInput
              label="Nome completo"
              placeholder="John Doe"
              type="text"
              name="name"
              error={formik.errors.name}
              {...formik.getFieldProps('name')}
            />
            <TextInput
              label="Endereço de e-mail"
              type="email"
              placeholder="exemplo@email.com"
              name="email"
              error={formik.errors.email}
              {...formik.getFieldProps('email')}
            />
            <div>
              <TextInput
                label="Idade"
                name="age"
                error={formik.errors.age}
                {...formik.getFieldProps('age')}
              />
              <TextInput
                label="Peso (em kg)"
                name="weight"
                error={formik.errors.weight}
                {...formik.getFieldProps('weight')}
              />
              <TextInput
                label="Altura"
                name="height"
                error={formik.errors.height}
                {...formik.getFieldProps('height')}
              />
            </div>
          </FormContent>
        </Container>
      </form>
    </Wrapper>
  );
};

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default StudentForm;
