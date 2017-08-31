const factoryHttpServer = require("./lib/http-server");
const log = require("./lib/log");

(async () => {
  try{
    log.info("Starting API server...");
    await factoryHttpServer();
    log.info("Started");
  }catch(err){
    log.error(err);
  }
  console.log("\x07");
})();

