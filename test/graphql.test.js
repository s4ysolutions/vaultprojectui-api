const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const supertest = require( "supertest");
const gql = require( "graphql-tag");
const ApolloClient = require("apollo-client");
const { print } = require('graphql/language/printer');
const factoryHttpServer = require("../src/lib/http-server");

chai.use(chaiAsPromised);
const expect = chai.expect;
//[[[ graphql server
let nextToken;
const graphqlFactory = server => {
  const printRequest = function (request) {
    return Object.assign({},request,{query: print(request.query)});
  }

  const graphql = new ApolloClient.ApolloClient({networkInterface: {
    query: function(request){
      const options = Object.assign({}, this._opts);
      const rao=({request, options});
      /*
      return this.applyMiddlewares({
        request,
        options,
      })
        .then(
          rao => {
          if (rao.request.query) {
            rao.request.query = removeConnectionDirectiveFromDocument( rao.request.query)
          }

          return rao;
        })
        .then( rao => */
      const httpr = supertest(server)
        .post("/graphql")
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

      if (nextToken) {
        httpr.set("Authorization", `Bearer ${nextToken}`);
      }

      return httpr
        .send(JSON.stringify(printRequest(request)))
        .then(response => response.status===200?response.body:{errors:[{message: response.status+": "+response.text}]})
        //.then(response => ({response: response.body, options}))
      /*
            this.applyAfterwares({
              response: response,
              options,
            })
        )
        */
        .then((payload) => {
          if (
            !payload.hasOwnProperty('data') &&
            !payload.hasOwnProperty('errors')
          ) {
            throw new Error( `Server response was missing for query '${request.debugName}'.`)
          } else {
            return payload
          }
        })
    }
  }});
  return graphql;
};
const initServer = async() => {
  global.server = await factoryHttpServer();
  global.graphql = graphqlFactory(server);
  global.query = opts=>graphql.query(Object.assign({fetchPolicy: "network-only"},opts));
  global.mutate = graphql.mutate;
  graphql.setToken = token => {nextToken=token, global.auth=jwtDecode(token)};
  graphql.query.setToken = token => graphql.setToken(token);
  graphql.mutate.setToken = token => graphql.setToken(token);
};

const shutdownServer = () => {
  server.close();
}
//]]]
describe("GraphQL", function() {
  before(async function()  {
    this.timeout(5000);
    await initServer();
  });

  after(async function(){
    await shutdownServer();
  });

  it("ping inline",async function(){
    const response = await query({query: gql`query ping {ping}`});
    expect(response).to.have.property("data");
    expect(response.data).to.have.property("ping","Ok!");
  })

  it("ping seneca",async function(){
    const response = await query({query: gql`query ping {pingSeneca}`});
    expect(response).to.have.property("data");
    expect(response.data).to.have.property("pingSeneca","Ok!");
  })
})
