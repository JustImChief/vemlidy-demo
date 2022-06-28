import express, { Router } from 'express';
import path                from 'path';

function AssetsMiddleware() {
  const router = Router({mergeParams: true});

  router.use('/assets', (req, res, next) => {
    if (!req.headers['x-no-compression']) {
      res.set('Cache-Control', 'max-age=315260000');
    }

    next();
  });

  router.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));

  return router;
}

export default AssetsMiddleware;