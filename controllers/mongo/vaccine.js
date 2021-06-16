const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  healthCareDistrict: {
    required: true,
    type: String
  },
  orderNumber: {
    required: true,
    type: Number
  },
  responsiblePerson: {
    required: true,
    type: String
  },
  injections: {
    required: true,
    type: Number
  },
  arrived: {
    required: true,
    type: String
  },
  vaccine: {
    required: true,
    type: String
  }
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;