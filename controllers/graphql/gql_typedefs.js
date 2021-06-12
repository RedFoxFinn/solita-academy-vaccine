
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    vaccinationCount: Int!,
    vaccineCount(brand: String): Int!
  }
`;

module.exports = { typeDefs };