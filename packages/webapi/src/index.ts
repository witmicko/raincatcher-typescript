import * as express from 'express';
import { Store, HasId } from '@raincatcher/store';

/** WebApi Module configuration  */
export interface WebApiConfig {
    /**
     * Enable results limits interface 
     */
    limits: boolean
}

/**
 * Raincatcher webapi service module
 * 
 * Create codeless API using express.js
 * 
 * @param store - storage implementation 
 * @param config - module configuration
 * @return router - router that can be mounted in top level application
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