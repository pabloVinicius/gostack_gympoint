import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableButton, TextInput } from '~/components';

import { Wrapper, Header, Container, FormContent } from './styles';

const schema = yup.object().shape({
  student: yup.string().required('Informe o aluno'),
  plan: yup.number().required('Informe o plano'),
  beginDate: yup.string().required('Informe a data de início'),
});

const PlanForm = ({ match }) => {
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';

  const formik = useFormik({
    initialValues: {
      student: '',
      plan: '',
      beginDate: '',
    },
    validationSchema: schema,
    onSubmit: values => console.log('values', values),
  });

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Header>
          <h1>{isNew ? 'Cadastro de matrícula' : 'Edição de matrícula'}</h1>
          <div>
            <Link to="/registrations">
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
              label="Aluno"
              name="student"
              error={formik.errors.student}
              {...formik.getFieldProps('student')}
            />
            <div>
              <TextInput
                label="Plano"
                name="plan"
                error={formik.errors.plan}
                {...formik.getFieldProps('plan')}
              />
              <TextInput
                label="Data de início"
                name="beginDate"
                error={formik.errors.beginDate}
                {...formik.getFieldProps('beginDate')}
              />
              <TextInput label="Data de término" readOnly />
              <TextInput label="Valor final" readOnly />
            </div>
          </FormContent>
        </Container>
      </form>
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
