/* eslint-disable react-hooks/exhaustive-deps */
/* disabled because it was trying to add formik in dependencies of useEffect, what was making api request run again */
import React, { useState, useEffect, useMemo } from 'react';
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
  title: yup.string().required('O título é obrigatório'),
  duration: yup.number().required('Informe a quantidade de meses'),
  price: yup.string().required('Informe o preço mensal'),
});

const PlanForm = ({ match }) => {
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  const handleSubmit = async values => {
    setLoading(true);
    const method = isNew ? api.post : api.put;
    const url = isNew ? 'plans' : `plans/${id}`;

    const formated = {
      ...values,
      price: formatStringToNumber(values.price) * 100, // i'm storing in cents
    };

    try {
      await method(url, formated);
      toast.success('Salvo com sucesso');

      if (isNew) {
        history.push('/plans');
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
      title: '',
      duration: '1',
      price: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`plans/${id}`);
        const { plan } = response.data;

        const { price } = plan;

        const formated = {
          ...plan,
          price: formatNumberToString(price / 100),
        };

        formik.setValues(formated);
        setLoading(false);
      } catch (err) {
        toast.error('Plano não encontrado');
        setNotFound(true);
        setLoading(false);
      }
    };

    if (!isNew) {
      getData();
    }
  }, [id, isNew]);

  const totalPrice = useMemo(() => {
    const { duration, price } = formik.values;
    const formated = formatNumberToString(
      duration * formatStringToNumber(price)
    );
    return formated === 'NaN' ? '-' : formated;
  }, [formik.values.price, formik.values.duration]);

  const changePrice = e => {
    formik.handleChange({
      target: {
        name: 'price',
        value: formatDecimal(e.target.value),
      },
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (notFound) {
    return (
      <Wrapper>
        <h1>Plano não encontrado</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
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
            <TextInput
              label="Título do plano"
              type="text"
              name="title"
              error={formik.errors.title}
              {...formik.getFieldProps('title')}
            />
            <div>
              <TextInput
                label="Duração (em meses)"
                name="duration"
                type="number"
                min="1"
                error={formik.errors.duration}
                {...formik.getFieldProps('duration')}
              />
              <TextInput
                label="Preço mensal (em reais)"
                name="price"
                error={formik.errors.price}
                // {...formik.getFieldProps('price')}
                onChange={changePrice}
                value={formik.values.price}
              />
              <TextInput
                label="Preço total"
                name="totalPrice"
                value={totalPrice}
                readOnly
              />
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
