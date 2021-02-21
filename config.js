const staging = {
  port: 3000,
  envName: "staging",
};

const production = {
  port: 5000,
  envName: "production",
};

const environments = {
  staging,
  production,
};

const currentEnvironment =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
