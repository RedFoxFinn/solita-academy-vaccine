
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
    id: (root) => root.id,
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
      return Vaccine.findOne({id: args.id.toString()});
    },
    vaccinations: async (root, args) => {
      return await Vaccination.find();
    },
    vaccinationCount: async (root, args) => {
      if (args.gender && genders.includes(args.gender.toLowerCase())) {
        return await Vaccination.countDocuments({gender: args.gender.toLowerCase()});
      } else if (args.gender && args.gender.toLowerCase() === 'binary') {
        return await Vaccination.countDocuments({gender: {$in: ['female','male']}});
      } else {
        return await Vaccination.countDocuments();
      }
    },
    vaccineOrderCount: async (root, args) => {
      if (args.brand && vaccines.includes(args.brand.toLowerCase())) {
        return await Vaccine.countDocuments({vaccine: args.brand});
      } else {
        return await Vaccine.countDocuments();
      }
    },
    vaccineInjectionCount: async (root, args) => {
      let injectionCount = 0;
      if (args.brand && vaccines.includes(args.brand.toLowerCase())) {
        const vaccines = await Vaccine.find({vaccine: args.brand});
        vaccines.forEach(v => injectionCount += v.injections);
      } else {
        const vaccines = await Vaccine.find();
        vaccines.forEach(v => injectionCount += v.injections);
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
      if (args.which && arguments.includes(args.which.toLowerCase()) && master) {
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
      } else {
        let refreshDone = false;
        refreshDone = await refreshAntiqua(master);
        refreshDone = await refreshSolarBuddhica(master);
        refreshDone = await refreshZerphy(master);
        refreshDone = await refreshVaccinations(master);
        return refreshDone
          ? 'All data refreshed'
          : 'Data not refreshed: missing or false credentials';
      }
    }
  }
};

module.exports = { resolvers };