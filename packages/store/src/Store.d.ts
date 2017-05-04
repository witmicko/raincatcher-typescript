import * as Promise from 'bluebird';

export interface HasId {
  id: string
}

interface Store<T extends HasId> {
  /**
   * Returns a list of all members of the store's data
   */
  list(): Promise<T[]>;
  /**
   * Adds a new user to the store's data
   * @param user User to add
   */
  add(user: T): Promise<T>;
  /**
   * Reset's the store's data
   */
  reset(): Promise<T[]>
}
export default Store;
