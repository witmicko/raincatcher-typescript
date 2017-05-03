/// <reference types="node" />
/// <reference types="mocha" />
import * as assert from 'assert';
import * as Promise from 'bluebird';
import Store from '../src/Store';
import Seedable from '../src/Seedable';

// TODO: replace with DI
import NanoStore from '../src/index';
describe('Store', function() {
  beforeEach(function(){
    this.store = new NanoStore([{
      id: 'susy',
      name: 'susy',
      address: 'somewhere'
    }]);
    this.store.reset();
  });

  describe('#list', function() {
    it('returns all items via an Array', function() {
      return this.store.list().then(l =>
        assert.equal(l.length, 1));
    })
  });

  describe('#add', function() {
    it('returns the added user', function() {
      return this.store.add({
        id: 'trever',
        name: 'trever',
        address: 'Somewhere only we know'
      }).then(u => assert.equal(u.name, 'trever'));
    });
  });

  describe('#reset', function() {
    it('resets data to the seed data', function() {
      this.store.reset().then(l =>
        assert.equal(l.length, 1));
    })
  });
});