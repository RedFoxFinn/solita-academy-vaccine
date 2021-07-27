import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { VACCINATION_COUNT } from '../controllers/graphql/queries/q_vaccination';
import { VACCINE_ORDER_COUNT } from '../controllers/graphql/queries/q_vaccine';
import Gender from './d_gender';
import Order from './d_order';
import District from './d_district';
import '../styles/elements.css';
import {Ripple} from './loading';

const DataVisualisation = () => {
  let vaccineDim;
  let genderDim;
  let healthcareDistrictDim;
  const vaccinationCount = useQuery(VACCINATION_COUNT);
  const orderCount = useQuery(VACCINE_ORDER_COUNT);
  const vaccinations = useSelector(state => state.vaccinations);
  const orders = useSelector(state => state.orders);
  const composite = useSelector(state => state.composite);
  
  function checkOrderStatus() {
    return orderCount && orderCount.called && orderCount.data
      && orders.status === 'done' ? true : false;
  }
  function checkVaccinationStatus() {
    return vaccinationCount && vaccinationCount.called && vaccinationCount.data
      && vaccinations.status === 'done' ? true : false;
  }
  function checkCompositeDataStatus() {
    return checkOrderStatus() && checkVaccinationStatus()
      && composite.status === 'done' ? true : false;
  }

  if (checkCompositeDataStatus()) {
    vaccineDim = {
      label: 'Vaccine',
      values: composite.data.map(d => d['vaccine'])
    };
    genderDim = {
      label: 'Gender',
      values: composite.data.map(d => d['gender'])
    };
    healthcareDistrictDim = {
      label: 'Healthcare district',
      values: composite.data.map(d => d['healthCareDistrict'])
    };
  }

  const GenderRate = () => {
    return <details className='set'>
      <summary>by gender</summary>
      <article className='set-container'>
        <Gender gender='Female' totalCount={vaccinationCount.data.vaccinationCount} />
        <Gender gender='Male' totalCount={vaccinationCount.data.vaccinationCount} />
        <Gender gender='Nonbinary' totalCount={vaccinationCount.data.vaccinationCount} />
      </article>
    </details>;
  };
  
  const VaccineRate = () => {
    return <details className='set'>
      <summary>by vaccine</summary>
      <article className='set-container'>
        <Order vaccineBrand='Antiqua' totalCount={orderCount.data.vaccineOrderCount} />
        <Order vaccineBrand='SolarBuddhica' totalCount={orderCount.data.vaccineOrderCount} />
        <Order vaccineBrand='Zerpfy' totalCount={orderCount.data.vaccineOrderCount} />
      </article>
    </details>;
  };
  const HealthcareDistrictRate = () => {
    const districtData = {
      HYKS: [],
      KYS: [],
      OYS: [],
      TAYS: [],
      TYKS: []
    };
    composite.data.forEach(composite => {
      switch (composite.healthCareDistrict) {
        case 'HYKS': districtData.HYKS.push(composite); break;
        case 'KYS': districtData.KYS.push(composite); break;
        case 'OYS': districtData.OYS.push(composite); break;
        case 'TAYS': districtData.TAYS.push(composite); break;
        case 'TYKS': districtData.TYKS.push(composite); break;
        default: break;
      }
    });
    return <details className='set'>
      <summary>by healthcare district</summary>
      <article className='set-container'>
        <District district='HYKS' districtData={districtData.HYKS} totalCount={composite.data.length} />
        <District district='KYS' districtData={districtData.KYS} totalCount={composite.data.length} />
        <District district='OYS' districtData={districtData.OYS} totalCount={composite.data.length} />
        <District district='TAYS' districtData={districtData.TAYS} totalCount={composite.data.length} />
        <District district='TYKS' districtData={districtData.TYKS} totalCount={composite.data.length} />
      </article>
    </details>;
  };
  const VaccineUsageRate = () => {};

  const Rates = () => {
    return <section className='dataVis'>
      <h3 style={{textAlign: 'center'}}>Data in numbers</h3>
      {checkVaccinationStatus() ? <GenderRate /> : <Ripple/>}
      {checkOrderStatus() ? <VaccineRate /> : <Ripple/>}
      {checkCompositeDataStatus() ? <HealthcareDistrictRate /> : <Ripple/>}
    </section>;
  };

  const Visualisation = () => {
    return <section id='dataVisualisation' className='dataVis'>
      <h3 style={{textAlign: 'center'}}>Data visualised</h3>
      {checkCompositeDataStatus()
        ? <article style={{outline: '1px solid rgba(220,30,50,0.5)', marginBottom: '4rem'}}>
          <Plot
            data={[
              {
                type: 'parcats',
                dimensions: [
                  healthcareDistrictDim, genderDim, vaccineDim
                ],
                line: {
                  shape: 'hspline',
                  cmin: 0,
                  cmax: 1,
                  color: new Int8Array(vaccineDim.values),
                  autocolorscale: true
                },
                labelfont: {size: 14},
                arrangement: 'freeform'
              }]}
            layout={ {width: window.innerWidth >= 1280 ? 1080 : 720, height: window.innerHeight >= 800 ? 720 : 480, title: 'Vaccinations'} }/>
        </article>
        : <Ripple/>}
    </section>
  };

  return <section id='dataVisualisation' >
    <React.Fragment>
      <Rates/>
      <Visualisation />
    </React.Fragment>
  </section>
};

export default DataVisualisation;