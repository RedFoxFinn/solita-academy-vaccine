import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { useQuery, useLazyQuery } from '@apollo/client';
import { InlineIcon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi-light/arrow-right';

import { VACCINATIONS, VACCINATION_COUNT } from '../controllers/graphql/queries/q_vaccination';
import { VACCINE_ORDER_COUNT } from '../controllers/graphql/queries/q_vaccine';
import { Error, Loading } from './status';
import databuilder from '../tools/databuilder';

const DataVisualisation = () => {
  let compositeData;
  let vaccineDim;
  let genderDim;
  let healthcareDistrictDim;
  const vaccinationCount = useQuery(VACCINATION_COUNT);
  const orderCount = useQuery(VACCINE_ORDER_COUNT);
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
      values: compositeData.map(d => d['vaccine'])
    };
    genderDim = {
      label: 'Gender',
      values: compositeData.map(d => d['gender'])
    };
    healthcareDistrictDim = {
      label: 'Healthcare district',
      values: compositeData.map(d => d['healthCareDistrict'])
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
      <Female />
      <Male />
      <Nonbinary />
    </section>;
  };

  const Antiqua = () => {
    const [loadVaccineOrderCountAntiqua, {called, data, error, loading}] = useLazyQuery(VACCINE_ORDER_COUNT, {
      variables: {
        by: 'brand',
        brand: 'Antiqua'
      }
    });
    let percentage;
    let injectionsPerOrder;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccineOrderCountAntiqua();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccineOrderCount / orderCount.data.vaccineOrderCount * 100;
      orders.data.find(order => injectionsPerOrder = order.vaccine === 'Antiqua' ? order.injections : 0);
    }
    return <section>
      <p>Antiqua:</p>
      {called
        ? loading
          ? <Loading datatype='order count by brand' />
          : error
            ? <Error datatype='order count by brand' />
            : data && <React.Fragment>
              <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccineOrderCount} orders</p>
              <p>{injectionsPerOrder} injections / order, {data.vaccineOrderCount * injectionsPerOrder} injections in total</p>
            </React.Fragment>
        : <Loading datatype='order count by brand' />
      }
    </section>;
  };

  const SolarBuddhica = () => {
    const [loadVaccineOrderCountSolarBuddhica, {called, data, error, loading}] = useLazyQuery(VACCINE_ORDER_COUNT, {
      variables: {
        by: 'brand',
        brand: 'SolarBuddhica'
      }
    });
    let percentage;
    let injectionsPerOrder;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccineOrderCountSolarBuddhica();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccineOrderCount / orderCount.data.vaccineOrderCount * 100;
      orders.data.find(order => injectionsPerOrder = order.vaccine === 'SolarBuddhica' ? order.injections : 0);
    }
    return <section>
      <p>SolarBuddhica:</p>
      {called
        ? loading
          ? <Loading datatype='order count by brand' />
          : error
            ? <Error datatype='order count by brand' />
            : data && <React.Fragment>
              <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccineOrderCount} orders</p>
              <p>{injectionsPerOrder} injections / order, {data.vaccineOrderCount * injectionsPerOrder} injections in total</p>
            </React.Fragment>
        : <Loading datatype='order count by brand' />
      }
    </section>;
  };
  
  const Zerpfy = () => {
    const [loadVaccineOrderCountZerpfy, {called, data, error, loading}] = useLazyQuery(VACCINE_ORDER_COUNT, {
      variables: {
        by: 'brand',
        brand: 'Zerpfy'
      }
    });
    let percentage;
    let injectionsPerOrder;
    if (checkOrderStatus() && checkVaccinationStatus() && compositeData && !called) {
      loadVaccineOrderCountZerpfy();
    }
    if (called && !loading && !error && data) {
      percentage = data.vaccineOrderCount / orderCount.data.vaccineOrderCount * 100;
      orders.data.find(order => injectionsPerOrder = order.vaccine === 'Zerpfy' ? order.injections : 0);
    }
    return <section>
      <p>Zerpfy:</p>
      {called
        ? loading
          ? <Loading datatype='order count by brand' />
          : error
            ? <Error datatype='order count by brand' />
            : data && <React.Fragment>
              <p>~ {percentage.toFixed(2)}% {<InlineIcon icon={arrowRight} />} {data.vaccineOrderCount} orders</p>
              <p>{injectionsPerOrder} injections / order, {data.vaccineOrderCount * injectionsPerOrder} injections in total</p>
            </React.Fragment>
        : <Loading datatype='order count by brand' />
      }
    </section>;
  };
  
  const VaccineRate = () => {
    return <section>
      <Antiqua />
      <SolarBuddhica />
      <Zerpfy />
    </section>;
  };
  const HealthcareDistrictRate = () => {};
  const VaccineUsageRate = () => {};

  const Rates = () => {
    return <section>
      <h3>Data in numbers:</h3>
      <article style={{display: 'inline-flex'}}>
      <GenderRate />
      <VaccineRate />
      </article>
    </section>;
  };

  return <section id='dataVisualisation' >
    {checkOrderStatus() && checkVaccinationStatus() && compositeData
      && <Rates/>}
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
      : <Loading datatype='composite data'/>}
  </section>
};

export default DataVisualisation;