import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  const userOneData = {
    name: 'Pablo Vinicius',
    email: 'vinicius.pablo.18@gmail.com',
    password: '123456',
  };

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
    const response = await request(app)
      .post('/users')
      .send(userOneData);

    expect(response.body).toHaveProperty('error', 'User already exists');
  });
});
