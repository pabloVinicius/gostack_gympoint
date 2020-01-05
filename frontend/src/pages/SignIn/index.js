import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, LogoContainer, Form } from './styles';
import logo from '~/assets/images/logo.svg';

import { TextInput, MainButton } from '~/components';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('O e-email é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 dígitos.')
    .required('Digite sua senha.'),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="GoBarber Logo" />
        <h1>GYMPOINT</h1>
      </LogoContainer>

      <Form onSubmit={formik.handleSubmit}>
        <TextInput
          label="Seu e-mail"
          type="email"
          placeholder="exemplo@email.com"
          name="email"
          error={formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <TextInput
          name="password"
          label="Sua senha"
          type="password"
          placeholder="******"
          error={formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        <MainButton type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </MainButton>
      </Form>
    </Container>
  );
};

export default SignIn;
