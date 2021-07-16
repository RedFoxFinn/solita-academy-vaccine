import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Vaccine from './vaccine';
import RenderOrders from './r_orders';
import inforeader from '../tools/inforeader';

describe('RenderOrders', () => {
  const order = inforeader.vaccineSample();
  const testComponentId = 'renderOrdersTest';
  let dummy = false;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('RenderOrders renders', () => {
    render(<RenderOrders id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, RenderOrders);
  });
  it('RenderOrders with placeholder text', () => {
    render(<RenderOrders id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component.textContent).toMatch('Orders . . .');
  });
  it('RenderOrders with vaccineSample', () => {
    render(<RenderOrders id={testComponentId} orders={[order]} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component.textContent).not.toMatch('Orders . . .');
    const vaccineComponent = screen.queryByTestId(order.id);
    expect(vaccineComponent).toBeTruthy();
    isCompositeComponentWithType(vaccineComponent, Vaccine);
  });
  it('RenderOrders vaccineSample data rendering', () => {
    render(<RenderOrders id={testComponentId} orders={[order]} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component.textContent).toMatch('Vaccine vial ID:');
    expect(component.textContent).toMatch(order.id);
    expect(component.textContent).toMatch(`Vaccine vial ID: ${order.id}`);
    expect(component.textContent).toMatch('Vaccine order number:');
    expect(component.textContent).toMatch(order.orderNumber.toString());
    expect(component.textContent).toMatch(`Vaccine order number: ${order.orderNumber}`);
    expect(component.textContent).toMatch('Responsible person:');
    expect(component.textContent).toMatch(order.responsiblePerson);
    expect(component.textContent).toMatch(`Responsible person: ${order.responsiblePerson}`);
    expect(component.textContent).toMatch('Healthcare district:');
    expect(component.textContent).toMatch(order.healthCareDistrict);
    expect(component.textContent).toMatch(`Healthcare district: ${order.healthCareDistrict}`);
    expect(component.textContent).toMatch('Vaccine:');
    expect(component.textContent).toMatch(order.vaccine);
    expect(component.textContent).toMatch(`Vaccine: ${order.vaccine}`);
    expect(component.textContent).toMatch('Injections / vial:');
    expect(component.textContent).toMatch(order.injections.toString());
    expect(component.textContent).toMatch(`Injections / vial: ${order.injections}`);
    const arrivalDate = new Date(order.arrived);
    expect(component.textContent).toMatch('Date of arrival:');
    expect(component.textContent).toMatch(arrivalDate.toLocaleString());
    expect(component.textContent).toMatch(`Date of arrival: ${arrivalDate.toLocaleString()}`);
    const monthInMilliseconds = 30*24*60*60*1000;
    const expirationDate = new Date(arrivalDate.valueOf()+monthInMilliseconds);
    expect(component.textContent).toMatch('Date of expiration:');
    expect(component.textContent).toMatch(expirationDate.toLocaleString());
    expect(component.textContent).toMatch(`Date of expiration: ${expirationDate.toLocaleString()}`);
  });
})
