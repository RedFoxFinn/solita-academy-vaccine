import { gql } from '@apollo/client';
import {VACCINE_DETAILS} from '../fragments/f_vaccine';

export const VACCINES = gql`
  query vaccines($by: String, $responsiblePerson: String, $healthCareDistrict: String, $vaccine: String) {
    vaccines(by: $by, responsiblePerson: $responsiblePerson, healthCareDistrict: $healthCareDistrict, vaccine: $vaccine) {
      ...VaccineDetails
    }
  }
  ${VACCINE_DETAILS}
`;

export const VACCINE = gql`
  query vaccine($by: String!, $id: String, $orderNumber: Int) {
    vaccine(by: $by, id: $id, orderNumber: $orderNumber) {
      ...VaccineDetails
    }
  }
  ${VACCINE_DETAILS}
`;

export const VACCINE_ORDER_COUNT = gql`
  query vaccineOrderCount($by: String, $brand: String, $healthCareDistrict: String, $responsiblePerson: String, $arrivalDate: String) {
    vaccineOrderCount(by: $by, brand: $brand, healthCareDistrict: $healthCareDistrict, responsiblePerson: $responsiblePerson, arrivalDate: $arrivalDate)
  }
`;

export const VACCINE_INJECTION_COUNT = gql`
  query vaccineInjectionCount($by: String, $brand: String, $healthCareDistrict: String, $responsiblePerson: String, $arrivalDate: String) {
    vaccineInjectionCount(by: $by, brand: $brand, healthCareDistrict: $healthCareDistrict, responsiblePerson: $responsiblePerson, arrivalDate: $arrivalDate)
  }
`;

export const VACCINE_ORDER_EXPIRATION = gql`
  query orderExpiration($orderNumber: Int!) {
    orderExpiration(orderNumber: $orderNumber)
  }
`;