import express from 'express';
import * as http from 'http';
import * as path from 'path';
import { AddressInfo } from 'net';
import indexRouter from './routes/index.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';

const app = express();

const __dirname = path.resolve();
const PORT = 1028;
const HOST_NAME = `localhost`;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

const server = http.createServer(app);
server.listen(PORT, HOST_NAME).on('listening', function () {
  const { port, address } = server.address() as AddressInfo;
  console.log(`Express server started on port ${port} at ${address}.`);
});
