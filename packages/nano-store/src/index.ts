import * as Promise from 'bluebird';
import { cloneDeep } from 'lodash';

import Store from './Store';
import User from "./User";

class NanoStore implements Store {
  private data: User[];

  constructor(private readonly seedData?: User[]) {
    if (seedData) {
      this.reset();
    } else {
      this.data = [];
    }
  };

  list() {
    return Promise.resolve(this.data);
  };

  add(user: User) {
    this.data.push(user);
    return Promise.resolve(user);
  };

  reset() {
    this.data = cloneDeep(this.seedData);
    return this.list();
  }
}

export default NanoStore;
