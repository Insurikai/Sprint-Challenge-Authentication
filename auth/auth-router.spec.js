const server = require('../api/server');
const request = require('supertest');

//Register
describe('POST /api/auth/register', () => {
  it("Notify me if it hasn't registered", () => {
    return request(server)
      .post('/api/auth/register')
      .expect(500)
      .then(res => {
        expect(res.body.message).toBeDefined();
      });
  });
  it('Return a token when succesfully registered', () => {
    return request(server)
      .post('/api/auth/register')
      .send({
        username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        password: 'hemmet'
      })
      .expect(201)
      .then(res => {
        expect(res.body.token).toBeDefined();
      });
  });
});

//Login
describe('POST /api/auth/login', () => {
  it("Notify me if it hasn't registered", () => {
    return request(server)
      .post('/api/auth/login')
      .expect(500)
      .then(res => {
        expect(res.body.message).toBeDefined();
      });
  });
  it('Return a token when succesfully logged in', () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        username: 'chronos',
        password: 'hemmet'
      })
      .expect(200)
      .then(res => {
        expect(res.body.token).toBeDefined();
      });
  });
});
