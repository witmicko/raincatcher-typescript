import Store from './Store';
import User from './User';
interface Seedable {
  new(seedData: User[]): Store;
}
export default Seedable;