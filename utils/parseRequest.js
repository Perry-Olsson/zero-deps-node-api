const parseRequest = req => {
  const url = new URL(req.url, "http://localhost:3001");

  const path = url.pathname;

  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  const queryStringObject = url.searchParams;

  const method = req.method.toLowerCase();

  const headers = req.headers;

  return { trimmedPath, queryStringObject, method, headers };
};

module.exports = parseRequest;
