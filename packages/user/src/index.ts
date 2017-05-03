import * as express from 'express';
import Store from '@raincatcher/nano-store/types/Store';
import { EventEmitter } from 'events';
import RouterEvents from './RouterEvents'
import EventedRouter from './EventedRouter';

export default function initializeRouter(Store: Store) {
  const router = express.Router() as EventedRouter;
  router.events = new EventEmitter() as RouterEvents;

  const route = router.route('/');

  route.get(function(req, res) {
    Store.list()
      .tap(function(list) {
        router.events.emit('list', list);
      })
      .then(res.json.bind(res));
  });

  route.post(function(req, res) {
    var userToCreate = req.body;
    Store.add(userToCreate)
      .tap(function(newUser) {
        router.events.emit('list', newUser);
      })
      .then(res.json.bind(res));
  });

  return router;
};