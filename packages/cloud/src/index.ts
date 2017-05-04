import app from './app';
import * as http from 'http';

var server = http.createServer(app);
server.listen(8001, "localhost", function() {
  console.log("App started at: " + new Date() + " on port: " + 8001);
});

export default server;