class Router {
  home(data, callback) {
    callback(200, { data: "homepage" });
  }

  hello(data, callback) {
    callback(200, { data: { message: "Hello there, whoever you might be." } });
  }

  ping(data, callback) {
    callback(200);
  }

  notFound(data, callback) {
    callback(404, { data: "Unkown endpoint" });
  }
}

module.exports = Router;
