
const config = require('./tools/config');

const http = require('http');
const path = require('path');

const mongoose = require('mongoose');
const express = require('express'),
  app = express(),
  PORT = config.port;

const apolloServer = require('./controllers/graphql/gql_server');
const data_retriever = require('./tools/data_retriever');

const Vaccine = require('./controllers/mongo/vaccine');
const Vaccination = require('./controllers/mongo/vaccination');

// mongoose setup
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

try {
  mongoose.connect(config.atlas.toString());
  console.log('MongoDB Atlas: connected');
} catch (e) {
  console.log('MongoDB Atlas: connection failed');
  console.log(e);
}

// backend routing declaration
app.route('/')
  .get((req,res) => {
    res.send(`Vaccinations backend says 'hi'`);
  });
app.route('/ping')
  .get((req, res) => res.send('pong'));
app.route('/data/all')
  .get(async (req, res) => {
    let data_all = {
      vaccines: [],
      vaccinations: []
    };
    data_all.vaccines = await Vaccine.find();
    data_all.vaccinations = await Vaccination.find();
    res.json(data_all);
  });
app.route('/data/antiqua')
  .get(async (req, res) => {
    const data_antiqua = await data_retriever('antiqua');
    res.json(data_antiqua);
  });
app.route('/data/solar_buddhica')
  .get(async (req, res) => {
    const data_solar_buddhica = await data_retriever('solar_buddhica');
    res.json(data_solar_buddhica);
  });
app.route('/data/zerpfy')
  .get(async (req, res) => {
    const data_zerpfy = await data_retriever('zerpfy');
    res.json(data_zerpfy);
  });
app.route('/data/vaccinations')
  .get(async (req, res) => {
    const data_vaccinations = await data_retriever('vaccinations');
    res.json(data_vaccinations);
  });

apolloServer.applyMiddleware({ app, path: ['/api', '/graphql'] });
const backend = http.createServer(app);
apolloServer.installSubscriptionHandlers(backend);

backend.listen(PORT, () => {
  console.log(`And we're live in ${config.env}-mode!`);
});