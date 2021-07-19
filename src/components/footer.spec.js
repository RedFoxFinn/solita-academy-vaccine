import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Footer from './footer';
import inforeader from '../tools/inforeader';

describe('footer', () => {
  let dummy = false;
  const testComponentId = 'footerTestID';
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('footer - test', () => {
    process.env.NODE_ENV = 'test';
    render(<Footer id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Footer);
    const repo = inforeader.repoinfo();
    const author = inforeader.authorinfo();
    const appid = inforeader.appid();
    expect(component.textContent).toMatch(`[${appid}]`);
    expect(screen.getByText(`[${appid}]`).getAttribute('href')).toMatch(repo.url);
    expect(component.textContent).toMatch(author.alias);
    expect(screen.getByText(author.alias).getAttribute('href')).toMatch(author.url);
  });
  it('footer - development', () => {
    process.env.NODE_ENV = 'development';
    render(<Footer id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Footer);
    const repo = inforeader.repoinfo();
    const author = inforeader.authorinfo();
    const appid = inforeader.appid();
    expect(component.textContent).toMatch(`[${appid}]`);
    expect(screen.getByText(`[${appid}]`).getAttribute('href')).toMatch(repo.url);
    expect(component.textContent).toMatch(author.alias);
    expect(screen.getByText(author.alias).getAttribute('href')).toMatch(author.url);
  });
  it('footer - production', () => {
    process.env.NODE_ENV = 'production';
    render(<Footer id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Footer);
    const repo = inforeader.repoinfo();
    const author = inforeader.authorinfo();
    const appid = inforeader.appid();
    expect(component.textContent).toMatch(`${appid}`);
    expect(screen.getByText(`${appid}`).getAttribute('href')).toMatch(repo.url);
    expect(component.textContent).toMatch(author.alias);
    expect(screen.getByText(author.alias).getAttribute('href')).toMatch(author.url);
  });
});
