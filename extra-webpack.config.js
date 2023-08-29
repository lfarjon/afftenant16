const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
};
