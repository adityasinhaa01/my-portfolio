const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('Backend Health & API Endpoints Suite', async (t) => {
  await t.test('GET /api/health returns 200 with status ok', async () => {
    const response = await request(app).get('/api/health');
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
    assert.ok(response.body.timestamp);
    assert.ok(response.body.services);
  });

  await t.test('POST /api/assistant/chat returns 200 and grounded reply for valid message', async () => {
    const response = await request(app)
      .post('/api/assistant/chat')
      .send({ message: 'What are Aditya’s technical skills?' });
    
    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(typeof response.body.reply === 'string');
    assert.ok(response.body.reply.length > 0);
  });

  await t.test('POST /api/assistant/chat rejects empty message with 400', async () => {
    const response = await request(app)
      .post('/api/assistant/chat')
      .send({ message: '   ' });
    
    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
  });

  await t.test('POST /api/contact accepts valid submission with 200', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Interested in discussing a software engineering project.'
      });
    
    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.message);
  });

  await t.test('POST /api/contact rejects invalid email with 400', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jane Doe',
        email: 'not-an-email',
        message: 'Hello'
      });
    
    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
  });

  await t.test('GET /health (root level) returns 200 with status ok', async () => {
    const response = await request(app).get('/health');
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
  });

  await t.test('CORS allows requests from onrender.com hosted frontend', async () => {
    const response = await request(app)
      .options('/api/health')
      .set('Origin', 'https://aditya-sinha-portfolio.onrender.com')
      .set('Access-Control-Request-Method', 'GET');
    
    assert.equal(response.status, 204);
    assert.equal(response.headers['access-control-allow-origin'], 'https://aditya-sinha-portfolio.onrender.com');
  });
});
