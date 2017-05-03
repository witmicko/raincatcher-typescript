import User from '@raincatcher/nano-store/types/User';
import { EventEmitter } from "events";

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

export default RouterEvents;