/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { isValid, parse, addMonths, format, parseISO } from 'date-fns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableButton, TextInput, SelectInput, Spinner } from '~/components';

import { Wrapper, Header, Container, FormContent } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const testSelectValue = object => {
  if (object.value && object.label) {
    return true;
  }
  return false;
};

const schema = yup.object().shape({
  student: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .test('Test object', 'Informe o aluno', value => testSelectValue(value))
    .required('Informe o aluno'),
  plan: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .test('Test object', 'Informe o plano', value => testSelectValue(value))
    .required('Informe o plano'),
  beginDate: yup
    .string()
    .test('Test date', 'Data inválida', value =>
      isValid(parse(value, 'dd/MM/yyyy', new Date()))
    )
    .required('Informe a data de início'),
});

const RegistrationForm = ({ match }) => {
  const [plans, setPlans] = useState([]);
  const id = decodeURIComponent(match.params.id);
  const isNew = id === 'new';
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  const handleSubmit = async values => {
    setLoading(true);
    const method = isNew ? api.post : api.put;
    const url = isNew ? 'registrations' : `registrations/${id}`;

    const { student, plan, beginDate } = values;

    const formated = {
      student_id: student.value,
      plan_id: plan.value,
      start_date: parse(beginDate, 'dd/MM/yyyy', new Date()),
    };

    try {
      await method(url, formated);
      toast.success('Salvo com sucesso');

      if (isNew) {
        history.push('/registrations');
      } else {
        setLoading(false);
      }
    } catch (err) {
      toast.error('Erro ao salvar');
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await api.get('/plans', {
          params: {
            perPage: Number.MAX_SAFE_INTEGER,
          },
        });

        const { plans: plansResponse } = response.data;

        const formated = plansResponse.map(el => ({
          label: el.title,
          value: el.id,
          price: el.totalPrice,
          duration: el.duration,
        }));
        setPlans(formated);
      } catch (err) {
        setPlans([]);
      }
    };
    getPlans();
  }, []);

  const formik = useFormik({
    initialValues: {
      student: undefined,
      plan: undefined,
      beginDate: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`registrations/${id}`);
        const { registration } = response.data;

        // eslint-disable-next-line camelcase
        const { student, plan, start_date } = registration;
        const formated = {
          student: {
            label: student.name,
            value: student.id,
          },
          plan: {
            value: plan.id,
            label: plan.title,
            price: plan.totalPrice,
            duration: plan.duration,
          },
          beginDate: format(parseISO(start_date), 'dd/MM/yyyy'),
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

  const getStudentsByName = async (q, callback) => {
    try {
      const response = await api.get('/students', {
        params: {
          perPage: Number.MAX_SAFE_INTEGER,
          q,
        },
      });

      const { students } = response.data;

      callback(
        students.map(el => ({
          label: el.name,
          value: el.id,
        }))
      );
    } catch (err) {
      callback([]);
    }
  };

  const endDate = useMemo(() => {
    const beginDate = parse(formik.values.beginDate, 'dd/MM/yyyy', new Date());

    if (isValid(beginDate)) {
      const newDate = addMonths(beginDate, formik.values.plan.duration);
      return format(newDate, 'dd/MM/yyyy');
    }
    return '';
  }, [formik.values.beginDate, formik.values.plan]);

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
            <SelectInput
              async
              label="Aluno"
              name="student"
              loadOptions={getStudentsByName}
              error={formik.errors.student}
              value={formik.values.student}
              onChange={e =>
                formik.handleChange({ target: { value: e, name: 'student' } })
              }
            />
            <div>
              <SelectInput
                label="Plano"
                name="plan"
                error={formik.errors.plan}
                options={plans}
                value={formik.values.plan}
                onChange={e =>
                  formik.handleChange({ target: { value: e, name: 'plan' } })
                }
              />
              <TextInput
                mask="00/00/0000"
                label="Data de início"
                name="beginDate"
                error={formik.errors.beginDate}
                {...formik.getFieldProps('beginDate')}
              />
              <TextInput
                name="endDate"
                value={endDate}
                label="Data de término"
                readOnly
              />
              <TextInput
                label="Valor final"
                name="finalPrice"
                readOnly
                value={formik.values.plan?.price || ''}
              />
            </div>
          </FormContent>
        </Container>
      </form>
    </Wrapper>
  );
};

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RegistrationForm;
