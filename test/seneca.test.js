const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const senecaDiag = require("../src/seneca/diag");

chai.use(chaiAsPromised);
const expect = chai.expect;


describe.skip("Seneca",function() {
  it("ping",function(done) {
    senecaDiag.act({cmd:"ping"},(error,result)=>{
      if (error) done(error);
      expect(result).to.be.equal("Ok!");
      done();
    })
  })
})
