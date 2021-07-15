import {render, screen, fireEvent, act } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import { ApolloProvider } from '@apollo/client';

import client from '../controllers/graphql/client';
import Vaccination from './vaccination';
import inforeader from '../tools/inforeader';

describe('vaccine', () => {
  let dummy = false;
  const sample = inforeader.vaccinationSample();
  beforeEach(() => render(<ApolloProvider client={client} ><Vaccination {...sample} /></ApolloProvider>));
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('vaccination renders', () => {
    const component = screen.queryByTestId(sample.vaccinationId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Vaccination);
  });
  it('vaccination renders ID', () => {
    const component = screen.queryByTestId(sample.vaccinationId);
    expect(component.textContent).toMatch('Vaccination ID:');
    expect(component.textContent).toMatch(sample.vaccinationId);
    expect(component.textContent).toMatch(`Vaccination ID: ${sample.vaccinationId}`);
  });
  it('vaccination renders gender', () => {
    const component = screen.queryByTestId(sample.vaccinationId);
    expect(component.textContent).toMatch('Gender:');
    expect(component.textContent).toMatch(sample.gender);
    expect(component.textContent).toMatch(`Gender: ${sample.gender}`);
  });
  it('vaccination renders vaccination date', () => {
    const component = screen.queryByTestId(sample.vaccinationId);
    const vaccinationDate = new Date(sample.vaccinationDate);
    expect(component.textContent).toMatch('Vaccination date:');
    expect(component.textContent).toMatch(vaccinationDate.toLocaleString());
    expect(component.textContent).toMatch(`Vaccination date: ${vaccinationDate.toLocaleString()}`);
  });
  it('vaccination renders vaccine loading button', () => {
    const button = screen.queryByTestId(`${sample.vaccinationId}.loadVaccineOrder.${sample.sourceBottle}`);
    expect(button).toBeTruthy();
    isCompositeComponentWithType(button, <button/>);
    expect(button.textContent).toMatch('Load vaccine order');
  });
  it('vaccination renders vaccine(order) details', async () => {
    act(() => {
      fireEvent.click(screen.queryByTestId(`${sample.vaccinationId}.loadVaccineOrder.${sample.sourceBottle}`));
      setTimeout(() => {
        const component = screen.queryByTestId(sample.sourceBottle);
        expect(screen.queryByTestId(`${sample.vaccinationId}.loadVaccineOrder.${sample.sourceBottle}}`)).not.toBeTruthy();
        expect(component).toBeTruthy();
        expect(component.textContent).toMatch('Vaccine vial ID:');
        expect(component.textContent).toMatch('Vaccine order number:');
        expect(component.textContent).toMatch('Responsible person:');
        expect(component.textContent).toMatch('Healthcare district:');
        expect(component.textContent).toMatch('Vaccine:');
        expect(component.textContent).toMatch('Injections / vial:');
        expect(component.textContent).toMatch('Date of arrival:');
        expect(component.textContent).toMatch('Date of expiration:');
      }, 5000);
    });
  });
});