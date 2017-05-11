import * as express from 'express';
import { Store, HasId } from '@raincatcher/store';
import WebApiConfig from './config';

/**
 * Raincatcher webapi service module
 * 
 * Create codeless API using express.js
 * 
 * @param {Store} store - storage implementation 
 * @param {WebApiConfig} config - module configuration
 * @return {express.Router} router that can be mounted in top level application
 */
export default function apiModule<T extends HasId>(store: Store<T>, config: WebApiConfig) {
  const router: express.Router = express.Router();
  const route = router.route('/');
  route.get(function (req, res) {
    store.list().then(res.json.bind(res));
  });
  route.post(function (req, res) {
    var userToCreate = req.body;
    store.add(userToCreate).then(res.json.bind(res));
  });
  return router;
};