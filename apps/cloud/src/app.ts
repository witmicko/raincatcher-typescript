import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as moment from 'moment';
import * as morgan from 'morgan';

import userRouterBuilder, { User } from '@raincatcher/user';
import Store from '@raincatcher/store';

const app: express.Express = express();
const seedData: User[] = require('./users.json');
const userRouter = userRouterBuilder(new Store<User>(seedData));

app.use(morgan('dev'));
app.use(cors());
// Using a body parser for JSON requests.
app.use(bodyParser.json());

app.use('/users', userRouter);

export default app;
