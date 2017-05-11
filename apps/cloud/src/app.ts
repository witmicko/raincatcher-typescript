import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as moment from 'moment';
import * as morgan from 'morgan';

import userRouterBuilder, { User } from '@raincatcher/user';
import Store from '@raincatcher/store';
const userSeedData: User[] = require('./users.json');
const userRouter = userRouterBuilder(new Store<User>(userSeedData));

import messageRouterBuilder, { Message } from '@raincatcher/message';
import ExternalStore from '@external/extending-store';
const messageRouter = messageRouterBuilder(new ExternalStore<Message>());

const app: express.Express = express();

app.use(morgan('dev'));
app.use(cors());
// Using a body parser for JSON requests.
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/messages', messageRouter);

import taskRoute from "./api/task"

app.use('/tasks', taskRoute);

export default app;
