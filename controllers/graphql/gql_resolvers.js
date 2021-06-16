
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const data_retriever = require('../../tools/data_retriever');

const Vaccine = require('../mongo/vaccine');
const Vaccination = require('../mongo/vaccination');

const pubsub = new PubSub();

const hash = (password) => {
  return bcrypt.hash(password, 10);
};

const vaccines = ['antiqua', 'solar_buddhica', 'zerpfy'];
const vaccinations = 'vaccinations';
const all = 'all';
const arguments = [...vaccines, vaccinations, all];
const genders = ['female', 'male', 'nonbinary'];

const resolvers = {
  Vaccine: {
    id: (root) => root.id,
    orderNumber: (root) => root.orderNumber,
    responsiblePerson: (root) => root.responsiblePerson,
    healthCareDistrict: (root) => root.healthCareDistrict,
    vaccine: (root) => root.vaccine,
    injections: (root) => root.injections,
    arrived: (root) => root.arrived
  },
  Vaccination: {
    vaccinationId: (root) => root['vaccination-id'],
    sourceBottle: (root) => root.sourceBottle,
    gender: (root) => root.gender,
    vaccinationDate: (root) => root.vaccinationDate
  },
  Query: {
    vaccine: async (root, args) => {
      let order;
      const antiqua = await data_retriever(vaccines[0]);
      const solar_buddhica = await data_retriever(vaccines[1]);
      const zerpfy = await data_retriever(vaccines[2]);
      while (order === undefined) {
        antiqua.forEach(a => {
          if (a.id === args.id) {
            order = a;
          }
        });
        solar_buddhica.forEach(sb => {
          if (sb.id === args.id) {
            order = sb;
          }
        });
        zerpfy.forEach(z => {
          if (z.id === args.id) {
            order = z;
          }
        });
      }
      return order;
    },
    vaccinations: async (root, args) => {
      return await data_retriever('vaccinations');
    },
    vaccinationCount: async (root, args) => {
      let foundVaccinations = 0;
      const vaccinations = await data_retriever('vaccinations');
      if (args.gender && genders.includes(args.gender.toLowerCase())) {
        vaccinations.forEach(vac => {
          foundVaccinations += vac.gender === args.gender.toLowerCase() ? 1 : 0;
        })
      } else if (args.gender && args.gender.toLowerCase() === 'binary') {
        vaccinations.forEach(vac => {
          foundVaccinations += vac.gender === 'female' || vac.gender === 'male' ? 1 : 0;
        })
      } else {
        foundVaccinations += vaccinations.length > 0 ? vaccinations.length : 0;
      }
      return foundVaccinations;
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
    },
    vaccineOrderCount: async (root, args) => {
      let foundOrders = 0;
      if (args.brand && vaccines.includes(args.brand.toLowerCase())) {
        const vaccine = await data_retriever(args.brand.toLowerCase());
        const orders = [...new Set(vaccine.map(v => v.orderNumber))];
        foundOrders += orders.length;
      } else {
        const antiqua = await data_retriever(vaccines[0]);
        const solar_buddhica = await data_retriever(vaccines[1]);
        const zerpfy = await data_retriever(vaccines[2]);
        const antiquaOrders = [...new Set(antiqua.map(a => a.orderNumber))];
        const solar_buddhicaOrders = [...new Set(solar_buddhica.map(sb => sb.orderNumber))];
        const zerpfyOrders = [...new Set(zerpfy.map(z => z.orderNumber))];
        foundOrders += antiquaOrders.length;
        foundOrders += solar_buddhicaOrders.length;
        foundOrders += zerpfyOrders.length;
      }
      return foundOrders;
    },
    vaccineInjectionCount: async (root, args) => {
      let foundInjections = 0;
      if (args.brand && vaccines.includes(args.brand.toLowerCase())) {
        const vaccine = await data_retriever(args.brand.toLowerCase());
        vaccine.forEach(v => {
          foundInjections += v.injections;
        });
      } else {
        const antiqua = await data_retriever(vaccines[0]);
        const solar_buddhica = await data_retriever(vaccines[1]);
        const zerpfy = await data_retriever(vaccines[2]);
        antiqua.forEach(a => {
          foundInjections += a.injections
        });
        solar_buddhica.forEach(sb => {
          foundInjections += sb.injections
        });
        zerpfy.forEach(z => {
          foundInjections += z.injections
        });
      }
      return foundInjections;
    },
    orderExpiration: async (root, args) => {
      let order;
      const antiqua = await data_retriever(vaccines[0]);
      const solar_buddhica = await data_retriever(vaccines[1]);
      const zerpfy = await data_retriever(vaccines[2]);
      while (order === undefined) {
        antiqua.forEach(a => {
          if (a.orderNumber === args.onrderNumber) {
            order = a;
          }
        });
        solar_buddhica.forEach(sb => {
          if (sb.orderNumber === args.orderNumber) {
            order = sb;
          }
        });
        zerpfy.forEach(z => {
          if (z.orderNumber === args.orderNumber) {
            order = z;
          }
        });
      }
      const arrivalDate = new Date(order.arrived);
      const expirationDateAddition = 30*24*60*60*1000;
      console.log(arrivalDate);
      console.log(arrivalDate.valueOf());
      console.log(expirationDateAddition);
      const expirationDate = new Date(expirationDateAddition+arrivalDate.valueOf());
      console.log(expirationDate);
      return expirationDate.toUTCString();
    },
    refreshAtlas: async (root, args) => {
      if (args.which && arguments.includes(args.which.toLowerCase())) {
        switch (args.which.toLowerCase()) {
          case 'antiqua': {
            await Vaccine.deleteMany({vaccine: /Antiqua/});
            const antiqua = await data_retriever('antiqua');
            antiqua.forEach(async (a) => {
              const vac = new Vaccine({
                id: a['id'],
                healthCareDistrict: a['healthCareDistrict'],
                orderNumber: a['orderNumber'],
                responsiblePerson: a['responsiblePerson'],
                injections: a['injections'],
                vaccine: a['vaccine'],
                arrived: a['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            return 'Antiqua data refreshed';
          };
          case 'solar_buddhica': {
            await Vaccine.deleteMany({vaccine: /SolarBuddhica/});
            const solar_buddhica = await data_retriever('solar_buddhica');
            solar_buddhica.forEach(async (sb) => {
              const vac = new Vaccine({
                id: sb['id'],
                healthCareDistrict: sb['healthCareDistrict'],
                orderNumber: sb['orderNumber'],
                responsiblePerson: sb['responsiblePerson'],
                injections: sb['injections'],
                vaccine: sb['vaccine'],
                arrived: sb['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            return 'SolarBuddhica data refreshed';
          };
          case 'zerpfy': {
            await Vaccine.deleteMany({vaccine: /Zerpfy/});
            const zerpfy = await data_retriever('zerpfy');
            zerpfy.forEach(async (z) => {
              const vac = new Vaccine({
                id: z['id'],
                healthCareDistrict: z['healthCareDistrict'],
                orderNumber: z['orderNumber'],
                responsiblePerson: z['responsiblePerson'],
                injections: z['injections'],
                vaccine: z['vaccine'],
                arrived: z['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            return 'Zerpfy data refreshed';
          };
          case 'vaccinations': {
            await Vaccination.deleteMany();
            const vaccinations = await data_retriever('vaccinations');
            vaccinations.forEach(async (v) => {
              const vacc = new Vaccination({
                vaccinationId: v['vaccination-id'],
                sourceBottle: v['sourceBottle'],
                gender: v['gender'],
                vaccinationDate: v['vaccinationDate']
              });
              try {
                await vacc.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            return 'Vaccinations data refreshed';
          };
          default: {
            await Vaccine.deleteMany({vaccine: /Antiqua/});
            const antiqua = await data_retriever('antiqua');
            antiqua.forEach(async (a) => {
              const vac = new Vaccine({
                id: a['id'],
                healthCareDistrict: a['healthCareDistrict'],
                orderNumber: a['orderNumber'],
                responsiblePerson: a['responsiblePerson'],
                injections: a['injections'],
                vaccine: a['vaccine'],
                arrived: a['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            await Vaccine.deleteMany({vaccine: /SolarBuddhica/});
            const solar_buddhica = await data_retriever('solar_buddhica');
            solar_buddhica.forEach(async (sb) => {
              const vac = new Vaccine({
                id: sb['id'],
                healthCareDistrict: sb['healthCareDistrict'],
                orderNumber: sb['orderNumber'],
                responsiblePerson: sb['responsiblePerson'],
                injections: sb['injections'],
                vaccine: sb['vaccine'],
                arrived: sb['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            await Vaccine.deleteMany({vaccine: /Zerpfy/});
            const zerpfy = await data_retriever('zerpfy');
            zerpfy.forEach(async (z) => {
              const vac = new Vaccine({
                id: z['id'],
                healthCareDistrict: z['healthCareDistrict'],
                orderNumber: z['orderNumber'],
                responsiblePerson: z['responsiblePerson'],
                injections: z['injections'],
                vaccine: z['vaccine'],
                arrived: z['arrived']
              });
              try {
                await vac.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            await Vaccination.deleteMany();
            const vaccinations = await data_retriever('vaccinations');
            vaccinations.forEach(async (v) => {
              const vacc = new Vaccination({
                vaccinationId: v['vaccination-id'],
                sourceBottle: v['sourceBottle'],
                gender: v['gender'],
                vaccinationDate: v['vaccinationDate']
              });
              try {
                await vacc.save();
              } catch (e) {
                throw new UserInputError(e.message, {invalidArgs: args});
              }
            });
            return 'All data refreshed';
          };
        }
      } else {
        await Vaccine.deleteMany({vaccine: /Antiqua/});
        const antiqua = await data_retriever('antiqua');
        antiqua.forEach(async (a) => {
          const vac = new Vaccine({
            id: a['id'],
            healthCareDistrict: a['healthCareDistrict'],
            orderNumber: a['orderNumber'],
            responsiblePerson: a['responsiblePerson'],
            injections: a['injections'],
            vaccine: a['vaccine'],
            arrived: a['arrived']
          });
          try {
            await vac.save();
          } catch (e) {
            throw new UserInputError(e.message, {invalidArgs: args});
          }
        });
        await Vaccine.deleteMany({vaccine: /SolarBuddhica/});
        const solar_buddhica = await data_retriever('solar_buddhica');
        solar_buddhica.forEach(async (sb) => {
          const vac = new Vaccine({
            id: sb['id'],
            healthCareDistrict: sb['healthCareDistrict'],
            orderNumber: sb['orderNumber'],
            responsiblePerson: sb['responsiblePerson'],
            injections: sb['injections'],
            vaccine: sb['vaccine'],
            arrived: sb['arrived']
          });
          try {
            await vac.save();
          } catch (e) {
            throw new UserInputError(e.message, {invalidArgs: args});
          }
        });
        await Vaccine.deleteMany({vaccine: /Zerpfy/});
        const zerpfy = await data_retriever('zerpfy');
        zerpfy.forEach(async (z) => {
          const vac = new Vaccine({
            id: z['id'],
            healthCareDistrict: z['healthCareDistrict'],
            orderNumber: z['orderNumber'],
            responsiblePerson: z['responsiblePerson'],
            injections: z['injections'],
            vaccine: z['vaccine'],
            arrived: z['arrived']
          });
          try {
            await vac.save();
          } catch (e) {
            throw new UserInputError(e.message, {invalidArgs: args});
          }
        });
        await Vaccination.deleteMany();
        const vaccinations = await data_retriever('vaccinations');
        vaccinations.forEach(async (v) => {
          const vacc = new Vaccination({
            vaccinationId: v['vaccination-id'],
            sourceBottle: v['sourceBottle'],
            gender: v['gender'],
            vaccinationDate: v['vaccinationDate']
          });
          try {
            await vacc.save();
          } catch (e) {
            throw new UserInputError(e.message, {invalidArgs: args});
          }
        });
        return 'All data refreshed';
      }
    }
  }
};

module.exports = { resolvers };