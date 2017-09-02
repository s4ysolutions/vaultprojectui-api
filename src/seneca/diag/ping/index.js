module.exports = function ping (options){
  this.add("init:ping", function(msg, done){done()});
  this.add("cmd:ping",function(msg,respond) {
    respond(null,"Ok!");
  })
}
