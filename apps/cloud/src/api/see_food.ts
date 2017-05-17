import Store from '@raincatcher/store';
import webapi, { ApiService, StoreApiService, WebApiConfig } from '@raincatcher/webapi';
import * as express from 'express';

interface SeeFood {
  id: string;
  isHotdog: boolean;
  mikeHuntScore: number;
}

const config: WebApiConfig = {
  limits: true
};

const sampleFood: SeeFood = {
  id: Math.random().toString(),
  isHotdog: false,
  mikeHuntScore: 4
};

const bachmanity: SeeFood = {
  id: Math.random().toString(),
  isHotdog: true,
  mikeHuntScore: 2
};

const foodStore = new Store<SeeFood>([sampleFood, bachmanity]);
const foodService = new StoreApiService<SeeFood>(foodStore);
const foodRouter: express.Router = webapi(foodService, config);

export default foodRouter;
