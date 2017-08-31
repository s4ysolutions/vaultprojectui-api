module.exports = {
  http: {
    port: process.env.HTTP_PORT || 8000
  },
  log: {
    level: process.env.LOG_LEVEL || "info"
  }
}
