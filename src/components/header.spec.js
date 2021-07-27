import React from 'react';
import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Header from './header';
import inforeader from '../tools/inforeader';

describe('header', () => {
  let dummy = false;
  const appname = inforeader.appname();
  const testComponentId = 'headerTestID';
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('header - test', () => {
    process.env.NODE_ENV = 'test';
    render(<Header id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Header);
    expect(component.textContent).toMatch(appname);
    expect(component.textContent).toMatch(`[${appname}]`);
  });
  it('header - development', () => {
    process.env.NODE_ENV = 'development';
    render(<Header id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Header);
    expect(component.textContent).toMatch(appname);
    expect(component.textContent).toMatch(`[${appname}]`);
  });
  it('header - production', () => {
    process.env.NODE_ENV = 'production';
    render(<Header id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Header);
    expect(component.textContent).toMatch(appname);
    expect(component.textContent).not.toMatch(`[${appname}]`);
  });
});
