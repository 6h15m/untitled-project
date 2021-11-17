import express from "express";
import * as path from "path";
import * as url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/home", (req, res) => {
  res.type("html").send(`
    <html lang="ko">
      <body></body>
      <script src="${"/public/js/pages/home/index.bundle.js"}"></script>
    </html>
  `);
});

app.listen(8081, () => {
  console.log("서버 실행");
});
