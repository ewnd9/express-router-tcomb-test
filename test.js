import test from 'ava';

import t from 'tcomb-validation';
import express from 'express';
import Router from 'express-router-tcomb';
import Agent from './';

test('test ok', async assert => {
  const app = express();
  const router = Router();

  router.route({
    method: 'GET',
    path: '/api/v1/items/:id',
    schema: {
      response: t.struct({
        status: t.String,
        id: t.String
      })
    },
    handler: (req, res) => {
      res.json({ status: 'ok', id: req.params.id });
    }
  });

  app.use('/', router.getRoutes(app));

  const server = app.listen();
  const agent = Agent(app, server);

  const id = 'test';
  const { body } = await agent.get('/api/v1/items/:id', { params: { id } });
  assert.truthy(body);
});

test('test error', async assert => {
  const app = express();
  const router = Router();

  router.route({
    method: 'GET',
    path: '/api/v1/items/:id',
    schema: {
      response: t.struct({
        status: t.String,
        id: t.Number
      })
    },
    handler: (req, res) => {
      res.json({ status: 'ok', id: req.params.id });
    }
  });

  app.use('/', router.getRoutes(app));

  const server = app.listen();
  const agent = Agent(app, server);

  const id = 'test';

  try {
    const { body } = await agent.get('/api/v1/items/:id', { params: { id } });
    assert.falsy(body);
  } catch (e) {
    assert.truthy(e);
  }
});
