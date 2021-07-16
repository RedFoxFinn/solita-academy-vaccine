import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import store from '../controllers/state/store';
import RenderVaccinations from './r_vaccinations';
import Vaccination from './vaccination';
import inforeader from '../tools/inforeader';

const TestParentComponentSet = ({id}) => {
  return <Provider store={store} >
    <TestComponentSet id={id} />
  </Provider>;
};

const TestComponentSet = ({id, withSample}) => {
  const dispatch = useDispatch();
  withSample && dispatch({type: 'vaccinations/setVaccinations', vaccinations: [inforeader.vaccinationSample()]});
  withSample && dispatch({type: 'vaccinations/setStatus', status: 'done'});
  return <React.Fragment><RenderVaccinations id={id} /></React.Fragment>;
};

describe('RenderVaccinations', () => {
  const sample = inforeader.vaccinationSample();
  let dummy = false;
  const testComponentId = 'testRenderVaccinations';
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('RenderVaccinations renders', () => {
    render(<TestParentComponentSet id={testComponentId} withSample={false} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, RenderVaccinations);
  });
  it('RenderVaccinations with placeholder text', () => {
    render(<TestParentComponentSet id={testComponentId} withSample={false} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component.textContent).toMatch('Vaccinations . . .');
  });
  it('RenderVaccinations with vaccinationSample', () => {
    render(<TestParentComponentSet id={testComponentId} withSample={true} />);
    const component = screen.queryByTestId(testComponentId);
    setTimeout(() => {
      expect(component.textContent).not.toMatch('Vaccinations . . .');
      const vaccinationComponent = screen.queryByTestId(sample.vaccinationId);
      expect(vaccinationComponent).toBeTruthy();
      isCompositeComponentWithType(vaccinationComponent, Vaccination);
    }, 5000);
  });
  it('RenderVaccinations vaccinationSample data rendering', () => {
    render(<TestParentComponentSet id={testComponentId} withSample={true} />);
    setTimeout(() => {
      const vaccinationComponent = screen.queryByTestId(sample.vaccinationId);
      expect(vaccinationComponent.textContent).toMatch('Vaccination ID:');
      expect(vaccinationComponent.textContent).toMatch(sample.vaccinationId);
      expect(vaccinationComponent.textContent).toMatch(`Vaccination ID: ${sample.vaccinationId}`);
      expect(vaccinationComponent.textContent).toMatch('Gender:');
      expect(vaccinationComponent.textContent).toMatch(sample.gender);
      expect(vaccinationComponent.textContent).toMatch(`Gender: ${sample.gender}`);
      const vaccinationDate = new Date(sample.vaccinationDate);
      expect(vaccinationComponent.textContent).toMatch('Vaccination date:');
      expect(vaccinationComponent.textContent).toMatch(vaccinationDate.toLocaleString());
      expect(vaccinationComponent.textContent).toMatch(`Vaccination date: ${vaccinationDate.toLocaleString()}`);
      const button = screen.queryByTestId(`${sample.vaccinationId}.loadVaccineOrder.${sample.sourceBottle}`);
      expect(button).toBeTruthy();
      isCompositeComponentWithType(button, <button/>);
      expect(button.textContent).toMatch('Load vaccine order');
    }, 5000);
  });
});
