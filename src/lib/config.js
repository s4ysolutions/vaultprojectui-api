module.exports = {
  vault: {
    uri: process.env.VAULT_URI || "http://localhost:8200",
    token: process.env.VAULT_TOKEN 
  },
  http: {
    port: process.env.HTTP_PORT || 8000
  },
  log: {
    level: process.env.LOG_LEVEL || "info"
  }
}
