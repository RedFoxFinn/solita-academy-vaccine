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
        const response = await axios.get(data_url.antiqua);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.antiqua.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const response = await axios.get(data_url.solar_buddhica);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.solar_buddhica.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const response = await axios.get(data_url.zerpfy);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.zerpfy.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      try {
        const response = await axios.get(data_url.vaccinations);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccinations.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json;
    };
    case 'antiqua': {
      try {
        const response = await axios.get(data_url.antiqua);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.antiqua.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.antiqua;
    };
    case 'solar_buddhica': {
      try {
        const response = await axios.get(data_url.solar_buddhica);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.solar_buddhica.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.solar_buddhica;
    };
    case 'zerpfy': {
      try {
        const response = await axios.get(data_url.zerpfy);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
          json.vaccines.zerpfy.push(JSON.parse(entry)); 
        });
      } catch (e) {
        console.log(e);
      }
      return json.vaccines.zerpfy;
    };
    case 'vaccinations': {
      try {
        const response = await axios.get(data_url.vaccinations);
        const splitted = response.data.split(/\n/);
        splitted.map(entry => {
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