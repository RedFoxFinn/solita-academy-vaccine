import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import { Error, Loading } from './status';

describe('status', () => {
  let dummy = false;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('status - Error', () => {
    const datatype = 'tester';
    render(<Error datatype={datatype} />);
    const component = screen.queryByTestId(`error-${datatype}`)
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Error);
    expect(component.textContent).toMatch(`Error loading ${datatype}`);
  });
  it('status - Loading', () => {
    const datatype = 'tester';
    render(<Loading datatype={datatype} />);
    const component = screen.queryByTestId(`loading-${datatype}`);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Loading);
    expect(component.textContent).toMatch(`Loading ${datatype}`);
  });
})
