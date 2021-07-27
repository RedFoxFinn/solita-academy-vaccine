import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Home from './home';
import home from '../data/home.json';

describe('home', () => {
  let dummy = false;
  const testid = 'homeTest';
  beforeEach(() => render(<Home id={testid} />));
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('home renders', () => {
    const component = screen.queryByTestId(testid);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Home);
  });
  it('intro', () => {
    const component = screen.queryByTestId(`${testid}`);
    expect(component.textContent).toMatch(home.intro);
  });
  it('disclaimer', () => {
    const component = screen.queryByTestId(`${testid}`);
    expect(component.textContent).toMatch(home.disclaimer);
  });
  it('assigner', () => {
    const component = screen.queryByTestId(`${testid}`);
    expect(component.textContent).toMatch(home.assignment.by.author);
  });
  it('purpose', () => {
    const component = screen.queryByTestId(`${testid}`);
    expect(component.textContent).toMatch(home.assignment.purpose);
  });
});