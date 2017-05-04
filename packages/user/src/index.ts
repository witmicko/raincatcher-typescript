import * as express from 'express';
import { Store } from '@raincatcher/store';
import { EventEmitter } from 'events';

export interface User {
	id : string;
	name : string;
  email : string;
}

/**
 * Events emmited by the router as stuff happens
 */
export interface RouterEvents extends EventEmitter {
  /**
   * List endpoint has been hit
   * @param listOfUsers The list of users
   */
  on(event: 'list', handler: (listOfUsers: [User]) => any) : this
  
  /**
   * Create endpoint has been hit
   * @param createdUser The created user
   */
  on(event: 'create', handler: (createdUser: User) => any) : this

}

export interface EventedRouter extends express.Router {
  events: RouterEvents;
}

export default function initializeRouter(store: Store<User>) {
  const router = express.Router() as EventedRouter;
  router.events = new EventEmitter() as RouterEvents;

  const route = router.route('/');

  route.get(function(req, res) {
    store.list()
      .tap(function(list) {
        router.events.emit('list', list);
      })
      .then(res.json.bind(res));
  });

  route.post(function(req, res) {
    var userToCreate = req.body;
    store.add(userToCreate)
      .tap(function(newUser) {
        router.events.emit('list', newUser);
      })
      .then(res.json.bind(res));
  });

  return router;
};