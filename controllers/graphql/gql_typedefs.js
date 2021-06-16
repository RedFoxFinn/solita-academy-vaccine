
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Vaccine {
    id: String!,
    orderNumber: Int!,
    responsiblePerson: String!,
    healthCareDistrict: String!,
    vaccine: String!,
    injections: Int!,
    arrived: String!
  },
  type Vaccination {
    vaccinationId: String!,
    sourceBottle: String!,
    gender: String!,
    vaccinationDate: String!
  },
  type Query {
    vaccine(id: String!): Vaccine!,
    vaccinations: [Vaccination!]!,
    vaccinationCount(gender: String): Int!,
    vaccineCount(brand: String): Int!,
    vaccineOrderCount(brand: String): Int!,
    vaccineInjectionCount(brand: String): Int!,
    orderExpiration(orderNumber: Int!): String!,
    refreshAtlas(which: String): String!
  }
`;

module.exports = { typeDefs };