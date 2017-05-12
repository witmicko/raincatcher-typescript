## Express.js based zero code api module

Create fully restfull CRUD api in less than minute;

### Usage

New api can be defined by creating new Interface

```
import * as express from 'express';
import Store from '@raincatcher/store';
import webapi, {WebApiConfig} from '@raincatcher/webapi';

// Define new datatype
interface Workorder {
    id: string
    name: string,
    completed: boolean
}
```

Create new router with CRUD API support.

```
let taskStore = new Store<Workorder>();
let taskRouter: express.Router = webapi(taskStore, config);
router.add("workflows", taskRouter);
```