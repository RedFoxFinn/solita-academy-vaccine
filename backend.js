const express = require('express');
const fs = require('fs');
const axios = require('axios');

const data_retriever = require('./tools/data_retriever');

const app = express();

app.route('/')
  .get((req,res) => {
    res.send(`Vaccinations backend says 'hi'`);
  });
app.route('/ping')
  .get((req, res) => res.send('pong'));
app.route('/data/all')
  .get(async (req, res) => {
    const data_all = await data_retriever('all');
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

app.listen(4000, () => {
  console.log(`And we're live!`);
});