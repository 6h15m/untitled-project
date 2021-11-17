import express from "express";
import * as path from "path";
import * as url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.type("html").send(`
    <html lang="ko">
      <head>
        <title>Untitled.</title>
        <link rel="stylesheet" type="text/css" href="${"/public/css/tmpl.css"}"/>
      </head>
      <body></body>
      <script src="${"/public/js/pages/home/index.bundle.js"}"></script>
    </html>
  `);
});

app.get("/cart", (req, res) => {
  res.type("html").send(`
    <html lang="ko">
      <head>
        <title>Untitled. | Cart</title>
        <link rel="stylesheet" type="text/css" href="${"/public/css/tmpl.css"}"/>
      </head>
      <body></body>
      <script src="${"/public/js/pages/cart/index.bundle.js"}"></script>
    </html>
  `);
});

app.get("/detail", (req, res) => {
  res.type("html").send(`
    <html lang="ko">
      <head>
        <title>Untitled. | Detail</title>
        <link rel="stylesheet" type="text/css" href="${"/public/css/tmpl.css"}"/>
      </head>
      <body></body>
      <script src="${"/public/js/pages/detail/index.bundle.js"}"></script>
    </html>
  `);
});

app.listen(8081, () => {
  console.log("서버 실행");
});
