import compression from 'compression';
import express     from 'express';

import { assets, ssr } from './middleware';

const server = express();

server.use(compression());

server.use(assets());
server.use(ssr());

server.listen(5075, () => {
  console.log('Server started on http://127.0.0.1:5075');
});