import app from './app';
import * as http from 'http';

var server = http.createServer(app);
server.listen(8001, "localhost", function() {
  console.log(
`App started at: ${new Date()} on port: 8001, use
curl -H "Content-Type: application/json" -d '{ "userId": "trever", "content": "hello world" }' localhost:8001/messages
to insert a sample message`
  );
});

export default server;