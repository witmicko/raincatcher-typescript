import StoreImpl, {HasId, Store} from '@raincatcher/store';
import webapi, {StoreApiService, WebApiConfig } from '@raincatcher/webapi';
import * as Promise from 'bluebird';
import * as express from 'express';
import {sampleTask, Task} from './task';

export interface SeeFood {
  id: string;
  isHotdog: boolean;
  mikeHuntScore: number;
  tasks: Task[];
}

const config: WebApiConfig = {
  limits: true
};

const sampleFood: SeeFood = {
  id: Math.random().toString(),
  isHotdog: false,
  mikeHuntScore: 4,
  tasks : [sampleTask]
};

const bachmanity: SeeFood = {
  id: Math.random().toString(),
  isHotdog: true,
  mikeHuntScore: 2,
  tasks: [sampleTask]
};

class FoodStore<SeeFood> extends StoreImpl<SeeFood> {
  public listTasks(food: SeeFood) {
    return Promise.resolve(food.tasks);
  }
}

class FoodService extends StoreApiService<SeeFood>{

  constructor(store: FoodStore<SeeFood>) {
    super(store);
  }
  public listTasks(food: SeeFood) {
    return this.store.listTasks(food);
  }
}
const foodService = new StoreApiService<SeeFood>(foodStore);
const foodRouter: express.Router = webapi(foodService);

export default foodRouter;
