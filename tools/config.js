const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production' || !process.env.SECRET) {
  dotenv.config();
}

const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_CONNECTIONSTRING;

const PORT = process.env.PORT || 4000;

const SECRET = process.env.SECRET;

const MASTERKEY = process.env.MASTERKEY;

module.exports = {
  atlas: MONGODB_ATLAS_URI,
  port: PORT,
  secret: SECRET,
  masterkey: MASTERKEY,
  env: process.env.NODE_ENV
};