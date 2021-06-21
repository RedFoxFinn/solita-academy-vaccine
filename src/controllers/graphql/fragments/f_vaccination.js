import { gql } from '@apollo/client';

export const VACCINATION_DETAILS = gql`
  fragment VaccinationDetails on Vaccination {
    vaccinationId
    sourceBottle
    gender
    vaccinationDate
  }
`;