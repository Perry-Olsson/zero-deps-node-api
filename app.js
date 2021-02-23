const StringDecoder = require("string_decoder").StringDecoder;
const parseRequest = require("./utils");
const Router = require("./Router");

const app = (req, res) => {
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
};

module.exports = app;
