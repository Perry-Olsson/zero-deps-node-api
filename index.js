const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, "http://localhost:3001");

  const path = url.pathname;

  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  const queryStringObject = url.searchParams;

  const method = req.method.toLowerCase();

  const headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const routeHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : router["notFound"];

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

server.listen(3001, () => {
  console.log(`Server is listening on port 3001`);
});

const handlers = {
  sample: function (data, callback) {
    callback(200, { data: "Hello World" });
  },
  notFound: function (data, callback) {
    callback(404, { data: "Unkown endpoint" });
  },
};

const router = {
  sample: handlers.sample,
  notFound: handlers.notFound,
};

// class Router {
//   sample(data, callback) {
//     callback(200, { name: "sample handler" });
//   }
// }

// const router2 = new Router();
