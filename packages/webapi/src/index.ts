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
    store.list().then(users => res.json(users));
  });
  route.post(function (req, res) {
    var userToCreate = req.body;
    store.add(userToCreate).then(user => res.json(user));
  });
  return router;
};