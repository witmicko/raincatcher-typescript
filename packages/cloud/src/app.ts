import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as moment from 'moment';

import userRouterBuilder, { User } from '@raincatcher/user';
import Store from '@raincatcher/store';

const app: express.Express = express();
const seedData: User[] = require('./users.json');
const userRouter = userRouterBuilder(new Store<User>(seedData));

app.use(cors());
// Using a body parser for JSON requests.
app.use(bodyParser.json());

userRouter.events.on('list', function() {
  console.log({
    topic: 'list',
    time: moment(new Date()).toString()
  });
});

userRouter.events.on('create', function(createdUser: User) {
  console.log({
    topic: 'create',
    time: moment(new Date()).toString(),
    user: createdUser
  });
});

app.use('/users', userRouter);

export default app;
