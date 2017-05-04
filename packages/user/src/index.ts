import * as express from 'express';
import { Store } from '@raincatcher/store';
import { EventEmitter } from 'events';

export interface User {
	id : string;
	name : string;
  email : string;
}

/**
 * Extra interface to allow the express router to have an EventEmitter
 */
export interface EventedRouter extends express.Router {
  events: EventEmitter;
}

export default function initializeRouter(store: Store<User>) {
  const router = express.Router() as EventedRouter;
  router.events = new EventEmitter();

  const route = router.route('/');

  route.get(function(req, res) {
    store.list()
      .tap(function(list: User[]) {
        router.events.emit('list', list);
      })
      .then(res.json.bind(res));
  });

  route.post(function(req, res) {
    var userToCreate = req.body;
    store.add(userToCreate)
      .tap(function(newUser: User) {
        router.events.emit('list', newUser);
      })
      .then(res.json.bind(res));
  });

  return router;
};