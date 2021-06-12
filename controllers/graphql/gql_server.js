const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const { resolvers } = require('./gql_resolvers');
const { typeDefs } = require('./gql_typedefs');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

module.exports = apolloServer;