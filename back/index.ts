import type { ErrorRequestHandler } from "express";
import express from "express";
import * as http from "http";
import CONFIG from "../untitled.config.json";
import {
  mainRouter,
  detailRouter,
  cartRouter,
  createRouter,
  searchRouter,
} from "./routes";

const app = express();
const PORT = CONFIG.PORTS.BACK;
const HOST_NAME = CONFIG.HOST;
const ALLOWED_ORIGINS = [
  `${CONFIG.PROTOCOL}:${CONFIG.PORTS.STORYBOOK}`,
  `${CONFIG.PROTOCOL}:${CONFIG.PORTS.FRONT}`,
];

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const theOrigin =
    origin && ALLOWED_ORIGINS.indexOf(origin) >= 0
      ? origin
      : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/", mainRouter);
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
