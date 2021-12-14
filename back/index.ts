import type { ErrorRequestHandler } from "express";
import express from "express";
import * as http from "http";
import indexRouter from "./routes/index.js";
import detailRouter from "./routes/detail.js";
import cartRouter from "./routes/cart.js";
import createRouter from "./routes/create.js";
import searchRouter from "./routes/search.js";

const app = express();
const PORT = 8082;
const HOST_NAME = `localhost`;

app.use(express.json());

app.use("/api/", indexRouter);
app.use("/api/detail", detailRouter);
app.use("/api/cart", cartRouter);
app.use("/api/create", createRouter);
app.use("/api/search", searchRouter);

const defaultErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    return;
  }
  res.status(500).json({ message: "Internal Server Error" });
};
app.use(defaultErrorHandler);

const server = http.createServer(app);
server.listen(PORT, HOST_NAME).on("listening", function () {
  console.log(`Express server started on port ${PORT} at ${HOST_NAME}.`);
});
