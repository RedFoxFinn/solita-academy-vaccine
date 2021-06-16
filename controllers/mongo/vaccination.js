const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  vaccinationId: {
    required: true,
    unique: true,
    type: String
  },
  sourceBottle: {
    required: true,
    type: String
  },
  gender: {
    required: true,
    type: String
  },
  vaccinationDate: {
    required: true,
    type: String
  }
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;