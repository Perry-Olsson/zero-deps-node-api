class Router {
  home(data, callback) {
    callback(200, { data: "homepage" });
  }

  sample(data, callback) {
    callback(200, { data: "sample handler" });
  }

  notFound(data, callback) {
    callback(404, { data: "Unkown endpoint" });
  }
}

module.exports = Router;
