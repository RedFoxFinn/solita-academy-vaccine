import { gql } from '@apollo/client';

export const VACCINE_DETAILS = gql`
  fragment VaccineDetails on Vaccine {
    id
    orderNumber
    healthCareDistrict
    responsiblePerson
    vaccine
    injections
    arrived
  }
`;