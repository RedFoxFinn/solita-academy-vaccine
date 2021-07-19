import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import {createMemoryHistory} from 'history';
import 'jest-canvas-mock';

import Header from './header';

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {wrapper: Router});
};

describe('header', () => {
  let dummy = false;
  const testComponentId = 'headerTestID';
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('header renders', () => {
    renderWithRouter(<Header id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Header);
  });
});
