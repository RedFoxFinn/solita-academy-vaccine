const axios = require('axios');

const data_url = require('../data/data_url.json');

const data_retriever = async (which_data) => {
  let json = {
    "vaccines": {
      "antiqua": [],
      "solar_buddhica": [],
      "zerpfy": []
    },
    "vaccinations": []
  };
  
  switch (which_data.toLowerCase()) {
    case 'all': {
      try {
        const {data} = await axios.get(data_url.antiqua);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.antiqua.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const {data} = await axios.get(data_url.solar_buddhica);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.solar_buddhica.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const {data} = await axios.get(data_url.zerpfy);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.zerpfy.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const {data} = await axios.get(data_url.vaccinations);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccinations.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json;
    };
    case 'antiqua': {
      try {
        const {data} = await axios.get(data_url.antiqua);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.antiqua.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.antiqua;
    };
    case 'solar_buddhica': {
      try {
        const {data} = await axios.get(data_url.solar_buddhica);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.solar_buddhica.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.solar_buddhica;
    };
    case 'zerpfy': {
      try {
        const {data} = await axios.get(data_url.zerpfy);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccines.zerpfy.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.zerpfy;
    };
    case 'vaccinations': {
      try {
        const {data} = await axios.get(data_url.vaccinations);
        const splitted = data.split(/\n/);
        splitted.forEach(entry => {
          json.vaccinations.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccinations;
    };
    default: return null;
  }
}

module.exports = data_retriever;