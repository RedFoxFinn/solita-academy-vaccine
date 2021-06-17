
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
    vaccination(id: String!): Vaccination!,
    vaccine(
      by: String!,
      id: String,
      orderNumber: Int
    ): Vaccine!,
    vaccinations(
      by: String,
      date: String,
      gender: String
    ): [Vaccination!]!,
    vaccines(
      by: String,
      responsiblePerson: String,
      healthCareDistrict: String,
      vaccine: String
    ): [Vaccine]!,
    vaccinationCount(gender: String): Int!,
    vaccineOrderCount(
      by: String,
      brand: String,
      healthCareDistrict: String,
      responsiblePerson: String,
      arrivalDate: String
    ): Int!,
    vaccineInjectionCount(
      by: String,
      brand: String,
      healthCareDistrict: String,
      responsiblePerson: String,
      arrivalDate: String
    ): Int!,
    orderExpiration(orderNumber: Int!): String!,
    refreshAtlas(which: String, masterkey: String!): String!
  }
`;

module.exports = { typeDefs };
