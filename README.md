# express-router-tcomb-test

[![Build Status](https://travis-ci.org/ewnd9/express-router-tcomb-test.svg?branch=master)](https://travis-ci.org/ewnd9/express-router-tcomb-test)

Test agent for [`express-router-tcomb`](https://github.com/ewnd9/express-router-tcomb)

## Install

```sh
$ npm install express-router-tcomb-test --save-dev
```

## Usage

```js
'use strict';

const express = require('express');
const t = require('tcomb');

const Router = require('express-router-tcomb');
const Agent = require('express-router-tcomb-test');

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
app.listen(3000);

const agent = Agent(app);

const id = 'test';
const { body } = await agent.get('/api/v1/items/:id', { params: { id } });
```

## License

MIT © [ewnd9](http://ewnd9.com)
