import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import { User } from '../../src/app/models';

describe('User', () => {
  const userOneData = {
    name: 'Pablo Vinicius',
    email: 'vinicius.pablo.18@gmail.com',
    password: '123456',
  };

  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send(userOneData);

    expect(response.body).toHaveProperty('user.id');
  });

  it('Should not be able to register because is missing a required argument', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: userOneData.email, name: userOneData.name });

    expect(response.body).toHaveProperty('error', 'Validation failed');
  });

  it('Should not be able to register a user with the same email', async () => {
    await request(app)
      .post('/users')
      .send(userOneData);

    const response = await request(app)
      .post('/users')
      .send(userOneData);

    expect(response.body).toHaveProperty('error', 'User already exists');
  });

  it('Should have its password encrypted when created', async () => {
    const user = await User.create(userOneData);

    const encrypted = await user.checkPassword(userOneData.password);

    expect(encrypted).toBe(true);
  });
});
