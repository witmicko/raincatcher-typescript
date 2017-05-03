import * as Promise from 'bluebird';
import { cloneDeep } from 'lodash';

import Store from './Store';

class StoreImpl<T> implements Store<T> {
  private data: T[];

  constructor(private readonly seedData?: T[]) {
    if (seedData) {
      this.reset();
    } else {
      this.data = [];
    }
  };

  list() {
    return Promise.resolve(this.data);
  };

  add(user: T) {
    this.data.push(user);
    return Promise.resolve(user);
  };

  reset() {
    this.data = cloneDeep(this.seedData);
    return this.list();
  }
}

export default StoreImpl;
