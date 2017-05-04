import Store, { HasId } from '@raincatcher/store/types/Store';
import * as redis from 'redis';
import * as Promise from 'bluebird';
import { randomBytes } from 'crypto';

function uid() {
  return randomBytes(16).toString('hex');
}

// extends NanoStore
class RedisStore<T extends HasId> implements Store<T> {
  private client: redis.RedisClient;
  constructor(private readonly prefix: string, private readonly seedData?: T[]){
    this.client = redis.createClient();
    if (seedData) {
      seedData.forEach(this.add.bind(this));
    }
  }
  list() {
    const smembers = Promise.promisify<[number], string>(this.client.smembers);
    const hgetall = Promise.promisify<Object, string>(this.client.hgetall);
    return smembers(this.prefix + ':ids')
      .map(id => hgetall(this.prefix + ':' + id)) as Promise<T[]>;
  }
  remove(user: T) {
    
  }
  private hsetKeys(o: T) {
    const multi = this.client.multi();
    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        var value = o[key];
        multi.hset(this.prefix + ':' + o.id, key, value);
      }
    }
    return multi
  }
  
  add(o: T) {
    o.id = o.id || uid();
    return new Promise<T>((resolve, reject) => this.hsetKeys(o)
      .sadd(this.prefix + ':ids', o.id)
      .exec(err => {
        if(err) {
          return reject(err);
        }
        return resolve(o)
      }));
  }
  reset() {
    // noop
    return this.list();
  }
}

export default RedisStore;
