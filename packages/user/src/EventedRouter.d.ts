import { Router } from 'express';
import { EventEmitter } from 'events';
import RouterEvents from './RouterEvents';
export interface EventedRouter extends Router {
  events: RouterEvents;
}
export default EventedRouter;