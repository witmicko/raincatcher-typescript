import * as express from 'express';
import { Store, HasId } from '@raincatcher/store';
import * as Logger from "bunyan";
import { ApiService, StoreApiService } from "./service";

var log = Logger.createLogger({ name: __filename, level: "debug" });

/** WebApi Module configuration  */
export interface WebApiConfig {
  /**
   * Enable results limits interface 
   */
  limits: boolean
}

/**
 * Example of logging middleware that can be used by clients
 */
export function loggerMiddleware(req: any, res: any) {
  log.trace("request payload", {
    method: req.method,
    uri: req.url,
    params: req.params,
    body: req.body
  });
};

/**
 * Raincatcher webapi service module
 * 
 * Create codeless API using express.js
 * 
 * @param service - service implementation 
 * @param config - module configuration
 * @return router - router that can be mounted in top level application
 */
export default function apiModule<T extends HasId>(service: ApiService<T>, config: WebApiConfig) {
  const router: express.Router = express.Router();
  const route = router.route('/');
  log.info("Creating new api mount", { config: config });
  route.get(function (req, res) {
    console.error("Using filter query", req.params.query);
    if (req.params.query) {
      let query: Object;
      try {
        query = JSON.parse(req.params.query);
      } catch (err) {
        log.error("Invalid query", {
          query: req.params.query,
          err: err
        });
      }
      log.error("TEST called", query);
      let limit = req.params.limit ? req.params.limit : 10;
      service.listWithCondition(query, limit).then(objects => res.json(objects));
    } else {
      log.debug("List all without query");
      service.list().then(objects => res.json(objects));
    }
  });
  route.post(function (req, res) {
    var userToCreate = req.body;
    service.add(userToCreate).then(objects => res.json(objects));
  });
  return router;
};

export * from "./service";
