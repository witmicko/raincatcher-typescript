import Store, { HasId } from './Store';
interface Seedable<T extends HasId> {
  new(seedData: T[]): Store<T>;
}
export default Seedable;