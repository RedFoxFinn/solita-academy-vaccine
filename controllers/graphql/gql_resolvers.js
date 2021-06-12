
const { AuthenticationError, PubSub } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const data_retriever = require('../../tools/data_retriever');

const pubsub = new PubSub();

const hash = (password) => {
  return bcrypt.hash(password, 10);
};

const vaccines = ['antiqua', 'solar_buddhica', 'zerpfy'];

const resolvers = {
  Query: {
    vaccinationCount: async (root, args) => {
      const vaccinations = await data_retriever('vaccinations');
      return vaccinations !== null
        ? vaccinations.length
        : null;
    },
    vaccineCount: async (root, args) => {
      let foundVaccines = 0;
      if (args.brand && vaccines.includes(args.brand.toLowerCase())) {
        const foundVac = await data_retriever(args.brand);
        foundVaccines += foundVac.length > 0 ? foundVac.length : 0;
      } else {
        const antiqua = await data_retriever(vaccines[0]);
        const solar_buddhica = await data_retriever(vaccines[1]);
        const zerpfy = await data_retriever(vaccines[2]);
        foundVaccines += antiqua.length;
        foundVaccines += solar_buddhica.length;
        foundVaccines += zerpfy.length;
      }
      return foundVaccines;
    }
  }
};

module.exports = { resolvers };