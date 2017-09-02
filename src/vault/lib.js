const Observable = require("rxjs/Observable").Observable;
require("rxjs/add/observable/of");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/if");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
const superagent = require("superagent");
//const auth = require("./auth");
const config = require("../lib/config").vault;
const log = require("../lib/log");

const $l = require("../lib/l"); // eslint-disable-line no-unused-vars

const wrap = p =>
  Observable.fromPromise(
    p
      .set("X-Vault-Token", config.token)
      .set("Accept", "application/json"))
    .catch(error =>
      (log.error("Vault HTTP Error:", error),
        error.status
       &&
       Observable.of({
         status: error.status,
         error: error.response.error,
         response: error.response.type=="application/json"?error.response.body:error.response.text })
       ||
       Observable.of({
         error,
         response: error.message
       })))
    .map(res => res.error && res || { status: res.status, response: res.type=="application/json"?res.body:res.text });

module.exports = {
  get: path => wrap(superagent.get(config.uri+"/v1"+path))
};
