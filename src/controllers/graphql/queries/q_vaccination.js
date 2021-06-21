
import { gql } from '@apollo/client';
import {VACCINATION_DETAILS} from '../fragments/f_vaccination';

export const VACCINATIONS = gql`
  query vaccinations($by: String, $date: String, $gender: String) {
    vaccinations(by: $by, date: $date, gender: $gender) {
      ...VaccinationDetails
    }
  }
  ${VACCINATION_DETAILS}
`;

export const VACCINATION = gql`
  query vaccination($id: String!) {
    vaccination(id: $id) {
      ...VaccinationDetails
    }
  }
  ${VACCINATION_DETAILS}
`;

export const VACCINATION_COUNT = gql`
  query vaccinationCount($gender: String, $date: String) {
    vaccinationCount(gender: $gender, date: $date)
  }
`;