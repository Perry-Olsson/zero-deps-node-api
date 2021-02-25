const http = require("http");
const https = require("https");
const config = require("./config");
const app = require("./app");
const fs = require("fs");

const httpServer = http.createServer((req, res) => app(req, res));

const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) =>
  app(req, res)
);

httpServer.listen(config.httpPort, () => {
  console.log(
    `http server is listening on port ${config.httpPort} in ${config.envName}`
  );
});

httpsServer.listen(config.httpsPort, () => {
  console.log(
    `https server is listening on port ${config.httpsPort} in ${config.envName}`
  );
});
