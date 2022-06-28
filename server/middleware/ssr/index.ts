import { Router }         from 'express';
import { createElement }  from 'react';
import { renderToString } from 'react-dom/server';

const {version} = require('../../../package.json');

function SSRMiddleware() {
  const router = Router();

  router.use('/', (req, res) => {
    import('../../../src/App')
      .then(({default: App}) => {
        res.status(200).send(`
<!DOCTYPE html>
<html lang='ru'>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <meta name='description' content='Steelline Group'>
    <meta name='robots' content='index, follow'>
    <title>Client</title>
    <link rel='stylesheet' href='/assets/css/app.min.css?${version}'/>
    <script type='text/javascript' src='/assets/js/app.min.js?${version}' defer></script>
  </head>
  <body>
    <div id='root'>
      ${renderToString(createElement(App))}
    </div>
  </body>
</html>
    `);
      });
  });

  return router;
}

export default SSRMiddleware;