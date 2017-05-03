import { Router } from 'express';
import { EventEmitter } from 'events';
export interface EventedRouter extends Router {
  events: EventEmitter;
}
export default EventedRouter;