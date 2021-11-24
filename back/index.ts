import express from 'express';
import * as http from 'http';
import indexRouter from './routes/index.js';

const app = express();
const PORT = 8082;
const HOST_NAME = `localhost`;

app.use('/', indexRouter);

const server = http.createServer(app);
server.listen(PORT, HOST_NAME).on('listening', function () {
  console.log(`Express server started on port ${PORT} at ${HOST_NAME}.`);
});
