const request = require('supertest');
const { app } = require('../app');

/* import chirps from './../../app/chirps/routes';
import json from './../../mocks/chrips.json'; */

/* const HOST = 'localhost:8080'; */

/* const useMocks = '?useMocks=1';

describe('Chirps', () => {
  it('list all chirps', done => {
    request(app)
      .get(`/${useMocks}`)
      .expect('Content-Type', /json/)
      .expect({
        data: json,
      })
      .expect(200, done);
  });
}); */
const login = {
  email: 'pancito@conqueso.com',
  password: 'pancito',
};

//? cambiar datos cada prueba
const reg = {
  email: 'tostada@conqueso.com',
  password: 'tos',
};

describe('Healthcheck', () => {
  test('should respond a 200 status', done => {
    request(app)
      .get(`/api/healthcheck`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('User', () => {
  test('should respond a NewUser and 200 status', async () => {
    request(app)
      .post('/api/users')
      .send(reg)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
