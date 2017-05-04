import * as express from 'express';
import { Store } from '@raincatcher/store';

export interface User {
	id : string;
	name : string;
  email : string;
}

export default function initializeRouter(store: Store<User>) {
  const router: express.Router = express.Router();

  const route = router.route('/');

  route.get(function(req, res) {
    store.list()
      .then(res.json.bind(res));
  });

  route.post(function(req, res) {
    var userToCreate = req.body;
    store.add(userToCreate)
      .then(res.json.bind(res));
  });

  return router;
};