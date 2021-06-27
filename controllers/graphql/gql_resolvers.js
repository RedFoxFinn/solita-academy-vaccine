
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const data_retriever = require('../../tools/data_retriever');
const config = require('../../tools/config');

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

const checkMastery = (key = null) => {
  return key && key === config.masterkey
    ? true
    : false;
};

const refreshAntiqua = async (master = false) => {
  if (master) {
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
    return true;
  } else {
    return false;
  }
};

const refreshSolarBuddhica = async (master = false) => {
  if (master) {
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
    return true;
  } else {
    return false;
  }
};

const refreshZerphy = async (master = false) => {
  if (master) {
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
    return true;
  } else {
    return false;
  }
};

const refreshVaccinations = async (master = false) => {
  if (master) {
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
    return true;
  } else {
    return false;
  }
}

const resolvers = {
  Vaccine: {
    id: (root) => root['id'],
    orderNumber: (root) => root.orderNumber,
    responsiblePerson: (root) => root.responsiblePerson,
    healthCareDistrict: (root) => root.healthCareDistrict,
    vaccine: (root) => root.vaccine,
    injections: (root) => root.injections,
    arrived: (root) => root.arrived
  },
  Vaccination: {
    vaccinationId: (root) => root.vaccinationId,
    sourceBottle: (root) => root.sourceBottle,
    gender: (root) => root.gender,
    vaccinationDate: (root) => root.vaccinationDate
  },
  Query: {
    vaccine: async (root, args) => {
      switch (args.by) {
        case 'id': return await Vaccine.findOne({id: args.id}) ?? null;
        case 'orderNumber': return await Vaccine.findOne({orderNumber: args.orderNumber}) ?? null;
        default: return await Vaccine.findOne() ?? null;
      }
    },
    vaccination: async (root, args) => {
      return await Vaccination.findOne({vaccinationId: args.id}) ?? null;
    },
    vaccines: async (root, args) => {
      let orders;
      switch (args.by) {
        case 'responsiblePerson': {
          orders = await Vaccine.find({responsiblePerson: args.responsiblePerson});
          break;
        };
        case 'healthCareDistrict': {
          orders = await Vaccine.find({healthCareDistrict: args.healthCareDistrict})
          break;
        };
        case 'vaccine': {
          orders = await Vaccine.find({vaccine: args.vaccine});
          break;
        };
        default: {
          orders = await Vaccine.find();
          break;
        };
      }
      orders.sort((a, b) => {
        return a.orderNumber < b.orderNumber ? -1 : 1;
      });
      return orders;
    },
    vaccinations: async (root, args) => {
      let vaccinations = [];
      switch (args.by) {
        case 'gender': {
          if (genders.includes(args.gender.toLowerCase())) {
            vaccinations = await Vaccination.find({gender: args.gender});
          } else if (args.gender.toLowerCase() === 'binary') {
            vaccinations = await Vaccination.find({gender: {$in: ['female','male']}});
          } else {
            vaccinations = await Vaccination.find();
          }
          break;
        };
        case 'date': {
          vaccinations = await Vaccination.find({vaccinationDate: new Date(args.date).toUTCString()});
          break;
        };
        case 'sourceBottle': {
          vaccinations = await Vaccination.find({sourceBottle: args.sourceBottle});
          break;
        };
        default: {
          vaccinations = await Vaccination.find();
          break;
        }
      }
      vaccinations.sort((a, b) => {
        return new Date(a.vaccinationDate).valueOf() < new Date(b.vaccinationDate).valueOf()
          ? -1
          : new Date(a.vaccinationDate).valueOf() > new Date(b.vaccinationDate).valueOf()
            ? 1
            : a.vaccinationId < b.vaccinationId
              ? -1
              : 1;
      });
      return vaccinations;
    },
    vaccinationCount: async (root, args) => {
      switch(args.by) {
        case 'gender': {
          if (args.gender && genders.includes(args.gender.toLowerCase())) {
            return await Vaccination.countDocuments({gender: args.gender.toLowerCase()});
          } else if (args.gender && args.gender.toLowerCase() === 'binary') {
            return await Vaccination.countDocuments({gender: {$in: ['female','male']}});
          } else {
            return await Vaccination.countDocuments();
          }
        };
        case 'date': return await Vaccination.countDocuments({vaccinationDate: new Date(args.date).toUTCString()});
        case 'sourceBottle': return await Vaccination.countDocuments({sourceBottle: args.sourceBottle});
        default: return Vaccination.countDocuments();
      }
    },
    vaccineOrderCount: async (root, args) => {
      switch (args.by) {
        case 'brand': {
          return vaccines.includes(args.brand.toLowerCase())
            ? await Vaccine.countDocuments({vaccine: args.brand})
            : await Vaccine.countDocuments();
        }
        case 'healthCareDistrict':
          return await Vaccine.countDocuments({healthCareDistrict: args.healthCareDistrict})
            ?? await Vaccine.countDocuments();
        case 'responsiblePerson':
          return await Vaccine.countDocuments({responsiblePerson: args.responsiblePerson})
            ?? await Vaccine.countDocuments();
        case 'arrivalDate':
          return await Vaccine.countDocuments({arrived: args.arrivalDate})
            ?? await Vaccine.countDocuments();
        default: return await Vaccine.countDocuments();
      }
    },
    vaccineInjectionCount: async (root, args) => {
      let injectionCount = 0;
      switch (args.by) {
        case 'brand': {
          const vaccines = vaccines.includes(args.brand.toLowerCase())
            ? await Vaccine.find({vaccine: args.brand})
            : await Vaccine.find();
          vaccines.forEach(v => injectionCount += v.injections);
        }
        case 'healthCareDistrict': {
          const vaccines = await Vaccine.find({healthCareDistrict: args.healthCareDistrict});
          vaccines.forEach(v => injectionCount += v.injections);
        }
        case 'responsiblePerson': {
          const vaccines = await Vaccine.find({responsiblePerson: args.responsiblePerson});
          vaccines.forEach(v => injectionCount += v.injections);
        }
        case 'arrivalDate': {
          const vaccines = await Vaccine.find({arrived: new Date(args.arrivalDate).toUTCString()});
          vaccines.forEach(v => injectionCount += v.injections);
        }
        default: {
          const vaccines = await Vaccine.find();
          vaccines.forEach(v => injectionCount += v.injections);
        }
      }
      return injectionCount;
    },
    orderExpiration: async (root, args) => {
      const order = await Vaccine.findOne({orderNumber: args.orderNumber});
      const arrivalDate = new Date(order.arrived);
      const expirationDateAddition = 30*24*60*60*1000;
      const expirationDate = new Date(expirationDateAddition+arrivalDate.valueOf());
      return expirationDate.toISOString();
    },
    refreshAtlas: async (root, args) => {
      const master = await checkMastery(args.masterkey);
      if (master && args.which && arguments.includes(args.which.toLowerCase())) {
        switch (args.which.toLowerCase()) {
          case 'antiqua': {
            return await refreshAntiqua(master)
              ? 'Antiqua data refreshed'
              : 'Data not refreshed: missing or false credentials';
          };
          case 'solar_buddhica': {
            return await refreshSolarBuddhica(master)
              ? 'SolarBuddhica data refreshed'
              : 'Data not refreshed: missing or false credentials';
          };
          case 'zerpfy': {
            return await refreshZerphy(master)
              ? 'Zerpfy data refreshed'
              : 'Data not refreshed: missing or false credentials';
          };
          case 'vaccinations': {
            return await refreshVaccinations(master)
              ? 'Vaccinations data refreshed'
              : 'Data not refreshed: missing or false credentials';
          };
          default: {
            let refreshDone = false;
            refreshDone = await refreshAntiqua(master);
            refreshDone = await refreshSolarBuddhica(master);
            refreshDone = await refreshZerphy(master);
            refreshDone = await refreshVaccinations(master);
            return refreshDone
              ? 'All data refreshed'
              : 'Data not refreshed: missing or false credentials';
          };
        }
      } else if (master) {
        let refreshDone = false;
        refreshDone = await refreshAntiqua(master);
        refreshDone = await refreshSolarBuddhica(master);
        refreshDone = await refreshZerphy(master);
        refreshDone = await refreshVaccinations(master);
        return refreshDone
          ? 'All data refreshed'
          : 'Data not refreshed: missing or false credentials';
      } else {
        return 'Data not refreshed: missing or false credentials';
      }
    }
  }
};

module.exports = { resolvers };
