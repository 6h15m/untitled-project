const path = require("path");

const config = {
  mode: "development",
  devtool: "inline-source-map",
};

const dir_list = ["home"];

module.exports = dir_list.map((dir_name) => ({
  ...config,
  name: dir_name,
  entry: path.resolve(__dirname, `./dist/pages/${dir_name}/index.js`),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, `./public/js/pages/${dir_name}`),
  },
}));
