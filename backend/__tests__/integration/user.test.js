import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('user.id');
  });

  it('Should not be able to register because is missing a required argument', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send({ email: user.email, name: user.name });

    expect(response.body).toHaveProperty('error', 'Validation failed');
  });

  it('Should not be able to register a user with the same email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('error', 'User already exists');
  });

  it('Should have its password encrypted when created', async () => {
    const password = '123456';
    const user = await factory.create('User', {
      password,
    });

    const encrypted = await user.checkPassword(password);

    expect(encrypted).toBe(true);
  });
});
