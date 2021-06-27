import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

import {Loading} from './status';
import databuilder from '../tools/databuilder';

const DataVisualisation = () => {
  let compositeData;
  let vaccineDim;
  let genderDim;
  let healthcareDistrictDim;
  const vaccinations = useSelector(state => state.vaccinations);
  const orders = useSelector(state => state.orders);
  
  function checkOrderStatus() {
    return orders.status === 'done' ? true : false;
  }
  function checkVaccinationStatus() {
    return vaccinations.status === 'done' ? true : false;
  }

  if (checkOrderStatus() && checkVaccinationStatus()) {
    compositeData = databuilder(vaccinations.data, orders.data);
  }
  if (checkVaccinationStatus() && checkOrderStatus() && compositeData) {
    vaccineDim = {
      label: 'Vaccine',
      values: compositeData.map(d => d.vaccine),
    };
    genderDim = {
      label: 'Gender',
      values: compositeData.map(d => d.gender)
    };
    healthcareDistrictDim = {
      label: 'Healthcare district',
      values: compositeData.map(d => d.healthCareDistrict)
    };
  }

  const GenderRate = () => {
    let rates = {female: 0, male: 0, nonbinary: 0};
    vaccinations.data.forEach((v) => {
      rates.female = v.gender === 'female' ? rates.female + 1 : rates.female;
      rates.male = v.gender === 'male' ? rates.male + 1 : rates.male;
      rates.nonbinary = v.gender === 'nonbinary' ? rates.nonbinary + 1 : rates.nonbinary;
    });
    return <section>
      <p>Out of all vaccinated:</p>
      <p>Female:</p>
      <p>{rates.female} / {rates.female/vaccinations.data.length*100}%</p>
    </section>;
  };
  const VaccineRate = () => {};
  const HealthcareDistrictRate = () => {};
  const VaccineUsageRate = () => {};

  return <section id='dataVisualisation' >
    <label for='datavis' >data visualisation</label>
    <article id='datavis' >
      {checkOrderStatus() && checkVaccinationStatus() && compositeData
        ? <section style={{outline: '1px solid rgba(220,30,50,0.5)'}}>
          <Plot
            data={[
              {
                type: 'parcats',
                dimensions: [
                  vaccineDim, genderDim, healthcareDistrictDim
                ],
                line: {color: 'rgb(220,30,50)', shape: 'hspline'},
                labelfont: {size: 14},
                hoveron: 'category',
                hoverinfo: 'count+probability',
                arrangement: 'perpendicular'
              }]}
            layout={ {width: window.innerWidth/1.5, height: window.innerHeight/1.5, title: 'Vaccinations'} }/>
        </section>
        : <Loading datatype='composite data'/>}
    </article>
  </section>
};

export default DataVisualisation;