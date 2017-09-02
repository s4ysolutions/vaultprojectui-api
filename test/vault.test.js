const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const vault = require("../src/vault");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe.only("Vault", function() {
  it("get", function(done) {
    vault.secret.generic.get("/s4y/dev/dev2/aws ").subscribe(
      function(data){
        expect(data).to.have.property("status", 200);
      },
      function(error){
        done(error);
      },
      function(){
        done();
      }
    ); 
  });
});
