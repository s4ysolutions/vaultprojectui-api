const app = require("./koa-app");
const log = require("./log");
const config = require("./config");

module.exports = () => new Promise((resolve, reject)=>{
  app.listen(config.http.port, function (err){
    if (err) {
      reject(err);
      return;
    }
    log.info("HTTP Server is Listening on ", this.address());
    resolve(this);
  });
});
