import {render, screen, fireEvent} from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Vaccine from './vaccine';
import inforeader from '../tools/inforeader';

describe('vaccine', () => {
  let dummy = false;
  const sample = inforeader.vaccineSample();
  beforeEach(() => render(<Vaccine embedded={false} {...sample} />));
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('vaccine(order) renders', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Vaccine);
  });
  it('vaccine(order) renders ID', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Vaccine vial ID:');
    expect(component.textContent).toMatch(sample.id);
    expect(component.textContent).toMatch(`Vaccine vial ID: ${sample.id}`);
  });
  it('vaccine(order) renders order number', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Vaccine order number:');
    expect(component.textContent).toMatch(sample.orderNumber.toString());
    expect(component.textContent).toMatch(`Vaccine order number: ${sample.orderNumber}`);
  });
  it('vaccine(order) renders responsible person', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Responsible person:');
    expect(component.textContent).toMatch(sample.responsiblePerson);
    expect(component.textContent).toMatch(`Responsible person: ${sample.responsiblePerson}`);
  });
  it('vaccine(order) renders healthcare district', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Healthcare district:');
    expect(component.textContent).toMatch(sample.healthCareDistrict);
    expect(component.textContent).toMatch(`Healthcare district: ${sample.healthCareDistrict}`);
  });
  it('vaccine(order) renders vaccine(brand)', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Vaccine:');
    expect(component.textContent).toMatch(sample.vaccine);
    expect(component.textContent).toMatch(`Vaccine: ${sample.vaccine}`);
  });
  it('vaccine(order) renders injections', () => {
    const component = screen.queryByTestId(sample.id);
    expect(component.textContent).toMatch('Injections / vial:');
    expect(component.textContent).toMatch(sample.injections.toString());
    expect(component.textContent).toMatch(`Injections / vial: ${sample.injections}`);
  });
  it('vaccine(order) renders arrival date', () => {
    const component = screen.queryByTestId(sample.id);
    const arrivalDate = new Date(sample.arrived);
    expect(component.textContent).toMatch('Date of arrival:');
    expect(component.textContent).toMatch(arrivalDate.toLocaleString());
    expect(component.textContent).toMatch(`Date of arrival: ${arrivalDate.toLocaleString()}`);
  });
  it('vaccine(order) renders expiration date', () => {
    const component = screen.queryByTestId(sample.id);
    const arrivalDate = new Date(sample.arrived);
    const monthInMilliseconds = 30*24*60*60*1000;
    const expirationDate = new Date(arrivalDate.valueOf()+monthInMilliseconds);
    expect(component.textContent).toMatch('Date of expiration:');
    expect(component.textContent).toMatch(expirationDate.toLocaleString());
    expect(component.textContent).toMatch(`Date of expiration: ${expirationDate.toLocaleString()}`);
  });
});