/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableButton, TextInput, Spinner } from '~/components';
import {
  formatDecimal,
  formatNumberToString,
  formatStringToNumber,
} from '~/util/format';

import { Wrapper, Header, Container, FormContent } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('O e-email é obrigatório'),
  age: yup
    .number()
    .min(1)
    .max(150, 'Apenas humanos de até 150 anos')
    .required('Informe a idade'),
  weight: yup.string().required('Informe o peso.'),
  height: yup.string().required('Informe a altura'),
});

const StudentForm = ({ match }) => {
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  const handleSubmit = async values => {
    setLoading(true);
    const method = isNew ? api.post : api.put;
    const url = isNew ? 'students' : `students/${id}`;

    const formated = {
      ...values,
      height: formatStringToNumber(values.height),
      weight: formatStringToNumber(values.weight),
    };
    try {
      await method(url, formated);
      toast.success('Salvo com sucesso');

      if (isNew) {
        history.push('/students');
      } else {
        setLoading(false);
      }
    } catch (err) {
      toast.error('Erro ao salvar');
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      weight: '',
      height: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`students/${id}`);
        const { student } = response.data;

        const { height, weight } = student;

        const formated = {
          ...student,
          height: formatNumberToString(height),
          weight: formatNumberToString(weight),
        };

        formik.setValues(formated);
        setLoading(false);
      } catch (err) {
        toast.error('Aluno não encontrado');
        setNotFound(true);
        setLoading(false);
      }
    };

    if (!isNew) {
      getData();
    }
  }, [id, isNew]);

  if (loading) {
    return <Spinner />;
  }

  if (notFound) {
    return (
      <Wrapper>
        <h1>Aluno não encontrado</h1>
      </Wrapper>
    );
  }

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
                type="number"
                min="0"
                error={formik.errors.age}
                {...formik.getFieldProps('age')}
              />
              <TextInput
                label="Peso (em kg)"
                name="weight"
                error={formik.errors.weight}
                {...formik.getFieldProps('weight')}
                value={formatDecimal(formik.values.weight)}
              />
              <TextInput
                label="Altura (em metros)"
                name="height"
                error={formik.errors.height}
                {...formik.getFieldProps('height')}
                value={formatDecimal(formik.values.height)}
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
