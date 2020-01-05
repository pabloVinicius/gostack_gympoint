/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import MainButton from '../MainButton';

import { Wrapper, Container } from './styles';

const HelpOrderModal = ({ question, onClose, onSubmit }) => {
  const wrapperRef = useRef();

  const formik = useFormik({
    initialValues: {
      answer: '',
    },
    validationSchema: yup.object().shape({
      answer: yup.string().required('Digite uma resposta'),
    }),
    onSubmit: ({ answer }) => onSubmit(answer),
  });

  const onBackdropClick = e => {
    if (e.target === wrapperRef.current) {
      onClose();
    }
  };

  return (
    <Wrapper ref={wrapperRef} onClick={onBackdropClick}>
      <Container>
        <div>
          <label>Pergunta do aluno</label>
          <p>{question}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Sua resposta</label>
            <textarea
              placeholder="Sua resposta aqui"
              name="answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
            />
            <span>{formik.errors.answer}</span>
          </div>
          <MainButton type="submit">Responder aluno</MainButton>
        </form>
      </Container>
    </Wrapper>
  );
};

HelpOrderModal.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
};

HelpOrderModal.propTypes = {
  question: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default HelpOrderModal;
