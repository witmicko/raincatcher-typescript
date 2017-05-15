import RaincatcherStore, { Store, HasId } from '@raincatcher/store';
import * as Logger from "bunyan";
import * as Promise from 'bluebird';

var log = Logger.createLogger({ name: __filename, level: "debug" });

/**
 * WebApi Service interface that can be used to define custom data handlers
 */
export interface ApiService<T extends HasId> extends Store<T> {
}

export class StoreApiService<T extends HasId> implements ApiService<T> {
  store: Store<T>

  constructor(store?: Store<T>) {
    this.store = store;
  };

  list() {
    log.info("Service list called");
    return this.store.list() as Promise<T[]>;
  };

  listWithCondition(condition: Object, limit: number) {
    log.info("Service list called",condition);
    return this.store.list() as Promise<T[]>;
  };

  add(object: T) {
    log.info("Service create called", object);
    return this.store.add(object) as Promise<T>;
  };

  reset() {
    return this.store.reset() as Promise<T[]>;
  }
}