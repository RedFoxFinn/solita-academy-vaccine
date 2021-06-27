import React from 'react';
import Plot from 'react-plotly.js';

const DataVisualisation = ({vaccinations, orders}) => {
  const vData = vaccinations;
  const oData = orders;

  function sortVaccinations(by = 'default', direction = 'asc') {
    switch (by) {
      default: vData.sort((a, b) => {
        return a.vaccinationId < b.vaccinationId ? 1 : -1;
      });
    }
  }
  function sortOrders(by = 'default', direction = 'asc') {
    switch(by) {
      default: oData.sort((a, b) => {
        return a.id < b.id ? 1 : -1;
      });
    }
  }
  return <section id='dataVisualisation' >
    <p>data visualisation</p>
    <article style={{outline: '1px solid rgb(220,30,50)'}}>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: window.innerWidth/2, height: window.innerHeight/2, title: 'A Fancy Plot'} }
      />
    </article>
  </section>
};

export default DataVisualisation;