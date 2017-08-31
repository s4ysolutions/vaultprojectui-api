const winston = require("winston");
const config = require("./config");

const log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.log.level || "warn",
      "timestamp": true,
      "colorize": true
    })
  ]
});

module.exports = log;
