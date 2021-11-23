import express from 'express';
import * as http from 'http';

const app = express();

const PORT = 8082;
const HOST_NAME = `localhost`;

const server = http.createServer(app);
server.listen(PORT, HOST_NAME).on('listening', function () {
  console.log(`Express server started on port ${PORT} at ${HOST_NAME}.`);
});
