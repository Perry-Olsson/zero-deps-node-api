const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;
const Router = require("./Router");
const config = require("./config");
const parseRequest = require("./utils");

const server = http.createServer(function (req, res) {
  const { trimmedPath, queryStringObject, method, headers } = parseRequest(
    req,
    res
  );

  const router = new Router();

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    let routeHandler;
    if (trimmedPath === "") routeHandler = router.home;
    else if (router[trimmedPath] === undefined) {
      routeHandler = router.notFound;
    } else routeHandler = router[trimmedPath];

    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    };

    routeHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode === "number" ? statusCode : 200;

      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

server.listen(config.port, () => {
  console.log(
    `Server is listening on port ${config.port} in ${config.envName}`
  );
});
