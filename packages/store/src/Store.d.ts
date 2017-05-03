import * as Promise from 'bluebird';
import User from './User';
interface Store {
  /**
   * Returns a list of all members of the store's data
   */
  list(): Promise<User[]>;
  /**
   * Adds a new user to the store's data
   * @param user User to add
   */
  add(user: User): Promise<User>;
  /**
   * Reset's the store's data
   */
  reset(): Promise<User[]>
}
export default Store;
