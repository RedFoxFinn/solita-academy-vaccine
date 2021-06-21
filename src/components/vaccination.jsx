import React from 'react';

const Vaccination = ({
  vaccinationId,
  gender,
  sourceBottle,
  vaccinationDate
}) => {
  const vaccineOrder = sourceBottle;
  return <section>
    <p>this is the data of one vaccination</p>
    <p>{vaccinationId}</p>
    <p>{gender}</p>
    <p>{new Date(vaccinationDate).valueOf()}</p>
    <p>{sourceBottle}</p>
    <p>vaccine order info here</p>
  </section>;
};

export default Vaccination;