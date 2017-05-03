import Store from './Store';
interface Seedable<T> {
  new(seedData: T[]): Store<T>;
}
export default Seedable;