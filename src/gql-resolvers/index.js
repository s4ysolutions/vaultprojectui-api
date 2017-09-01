const senecaDiag = require("../seneca/diag");
module.exports = {
  Query: {
    ping: ()=>"Ok!",
    pingSeneca: ()=> new Promise(resolve=> senecaDiag.act("cmd:ping",(err,res)=>err&&rejected(err)||resolve(res)))
  }
};
