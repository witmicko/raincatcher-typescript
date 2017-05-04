/// <reference types="node" />
/// <reference types="mocha" />
import * as assert from 'assert';
import * as Promise from 'bluebird';
import { Store, Seedable } from '../src';

// TODO: replace with DI
import StoreImpl from '../src';
describe('Store', function() {
  let store: Store<{ id: string, name: string, address: string }>;
  beforeEach(function(){
    store = new StoreImpl([{
      id: 'susy',
      name: 'susy',
      address: 'somewhere'
    }]);
    store.reset();
  });

  describe('#list', function() {
    it('returns all items via an Array', function() {
      return store.list().then(l =>
        assert.equal(l.length, 1));
    })
  });

  describe('#add', function() {
    it('returns the added user', function() {
      return store.add({
        id: 'trever',
        name: 'trever',
        address: 'Somewhere only we know'
      }).then(u => assert.equal(u.name, 'trever'));
    });
  });

  describe('#reset', function() {
    it('resets data to the seed data', function() {
      store.reset().then(l =>
        assert.equal(l.length, 1));
    })
  });
});