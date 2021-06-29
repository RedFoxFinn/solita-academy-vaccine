import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { useQuery, useLazyQuery } from '@apollo/client';
import { InlineIcon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi-light/arrow-right';

import { VACCINATIONS, VACCINATION_COUNT } from '../controllers/graphql/queries/q_vaccination';
import { Error, Loading } from './status';
import databuilder from '../tools/databuilder';

const DataVisualisation = () => {
  let compositeData;
  let vaccineDim;
  let genderDim;
  let healthcareDistrictDim;
  const vaccinationCount = useQuery(VACCINATION_COUNT);
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
      values: compositeData.map(d => d.vaccine)
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

  const Female = () => {
    const [loadVaccinationCountFemale, {called, data, error, loading}] = useLazyQuery(VACCINATION_COUNT, {
      variables: {
        by: 'gender',
        gender: 'female'
      }
    });
    let percentage;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccinationCountFemale();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccinationCount / vaccinationCount.data.vaccinationCount * 100;
    }
    return <section>
      <p>Female:</p>
      {called
        ? loading
          ? <Loading datatype='vaccination count by gender' />
          : error
            ? <Error datatype='vaccination count by gender' />
            : data && <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccinationCount} individuals</p>
        : <Loading datatype='vaccination count by gender' />
      }
    </section>;
  };

  const Male = () => {
    const [loadVaccinationCountMale, {called, data, error, loading}] = useLazyQuery(VACCINATION_COUNT, {
      variables: {
        by: 'gender',
        gender: 'male'
      }
    });
    let percentage;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccinationCountMale();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccinationCount / vaccinationCount.data.vaccinationCount * 100;
    }
    return <section>
      <p>Male:</p>
      {called
        ? loading
          ? <Loading datatype='vaccination count by gender' />
          : error
            ? <Error datatype='vaccination count by gender' />
            : data && <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccinationCount} individuals</p>
        : <Loading datatype='vaccination count by gender' />
      }
    </section>;
  };

  const Nonbinary = () => {
    const [loadVaccinationCountNonbinary, {called, data, error, loading}] = useLazyQuery(VACCINATION_COUNT, {
      variables: {
        by: 'gender',
        gender: 'nonbinary'
      }
    });
    let percentage;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccinationCountNonbinary();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccinationCount / vaccinationCount.data.vaccinationCount * 100;
    }
    return <section>
      <p>Nonbinary:</p>
      {called
        ? loading
          ? <Loading datatype='vaccination count by gender' />
          : error
            ? <Error datatype='vaccination count by gender' />
            : data && <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccinationCount} individuals</p>
        : <Loading datatype='vaccination count by gender' />
      }
    </section>;
  };

  const GenderRate = () => {
    return <section>
      <h3>Out of all vaccinated:</h3>
      <Female />
      <Male />
      <Nonbinary />
    </section>;
  };
  const VaccineRate = () => {};
  const HealthcareDistrictRate = () => {};
  const VaccineUsageRate = () => {};

  return <section id='dataVisualisation' >
    {checkOrderStatus() && checkVaccinationStatus() && compositeData
      && <GenderRate/>}
    {checkOrderStatus() && checkVaccinationStatus() && compositeData
      ? <article style={{outline: '1px solid rgba(220,30,50,0.5)', marginBottom: '4rem'}}>
        <Plot
          data={[
            {
              type: 'parcats',
              dimensions: [
                healthcareDistrictDim, genderDim, vaccineDim
              ],
              line: {
                color: vaccineDim.values,
                colorscale: [[0,'firebrick'],[1,'orange'],[2,'teal']],
                shape: 'hspline'
              },
              labelfont: {size: 14},
              hoveron: 'color',
              hoverinfo: 'count+probability',
              arrangement: 'perpendicular'
            }]}
          layout={ {width: window.innerWidth >= 1280 ? 1080 : 720, height: window.innerHeight >= 800 ? 720 : 480, title: 'Vaccinations'} }/>
      </article>
      : <Loading datatype='composite data'/>}
  </section>
};

export default DataVisualisation;