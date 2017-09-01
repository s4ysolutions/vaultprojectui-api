const { makeExecutableSchema } = require("graphql-tools");
const schema = require("../gql-schema");
const resolvers = require("../gql-resolvers");

module.exports = makeExecutableSchema({typeDefs: schema, resolvers});
