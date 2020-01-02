/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import MainButton from '../MainButton';

import { Wrapper, Container } from './styles';

const HelpOrderModal = ({ id, onClose }) => {
  const [response, changeResponse] = useState('');
  const wrapperRef = useRef();

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
          <p>
            Olá pessoal da academia, gostaria de saber se quando acordar devo
            ingerir batata doce e frango logo de primeira, preparar as marmitas
            e lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
          </p>
        </div>
        <div>
          <label>Sua resposta</label>
          <textarea
            placeholder="Sua resposta aqui"
            onChange={e => changeResponse(e.target.value)}
          >
            {response}
          </textarea>
        </div>
        <MainButton>Responder aluno</MainButton>
      </Container>
    </Wrapper>
  );
};

HelpOrderModal.defaultProps = {
  onClose: () => {},
};

HelpOrderModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default HelpOrderModal;
