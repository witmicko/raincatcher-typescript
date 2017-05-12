import * as Promise from 'bluebird';
import { cloneDeep } from 'lodash';

/**
 * Extra optional interface to enforce constructor signature
 */
export interface Seedable<T extends HasId> {
  new(seedData: T[]): Store<T>;
}

export interface HasId {
  id: string
}

export interface Store<T extends HasId> {
  /**
   * Returns a list of all members of the store's data
   */
  list(): Promise<T[]>

  // /**
  //  * Returns a list of  members of the store's data filtered by condition
  //  * 
  //  * @param condition - condition used to filter things
  //  * 
  //  * NOTE Intentionally not breaking interface but providing new modified method. 
  //  */ 
  // list(condition?: Object): Promise<T[]>

  /**
   * Adds a new user to the store's data
   * @param user User to add
   */
  add(user: T): Promise<T>
  /**
   * Reset's the store's data
   */
  reset(): Promise<T[]>
}

class StoreImpl<T extends HasId> implements Store<T> {
  protected data: T[];

  constructor(protected readonly seedData?: T[]) {
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
