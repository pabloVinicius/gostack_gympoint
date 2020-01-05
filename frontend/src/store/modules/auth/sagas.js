import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
    history.push('/students');
  } catch (err) {
    toast.error('E-email ou senha inválidos!');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
