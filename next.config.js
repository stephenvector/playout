require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");

module.exports = withTM(
  withCSS({
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];

      return config;
    },
    transpileModules: ["react-dnd", "dnd-core"]
  })
);
