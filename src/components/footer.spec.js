import React from 'react';
import { render, screen } from '@testing-library/react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';

import Footer from './footer';
import inforeader from '../tools/inforeader';

describe('header', () => {
  let dummy = false;
  const repoinfo = inforeader.repoinfo();
  const authorinfo = inforeader.authorinfo();
  const appid = inforeader.appid();
  const testComponentId = 'headerTestID';
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
    expect(component.textContent).toMatch(appid);
    expect(component.textContent).toMatch(`[${appid}]`);
    const repourl = screen.getByText(`[${appid}]`);
    expect(repourl).toBeTruthy();
    expect(repourl["href"]).toMatch(repoinfo.url);
    expect(component.textContent).toMatch(authorinfo.alias);
    const authorurl = screen.getByText(authorinfo.alias);
    expect(authorurl).toBeTruthy();
    expect(authorurl["href"]).toMatch(authorinfo.url);
  });
  it('footer - development', () => {
    process.env.NODE_ENV = 'development';
    render(<Footer id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Footer);
    expect(component.textContent).toMatch(appid);
    expect(component.textContent).toMatch(`[${appid}]`);
    const repourl = screen.getByText(`[${appid}]`);
    expect(repourl).toBeTruthy();
    expect(repourl["href"]).toMatch(repoinfo.url);
    expect(component.textContent).toMatch(authorinfo.alias);
    const authorurl = screen.getByText(authorinfo.alias);
    expect(authorurl).toBeTruthy();
    expect(authorurl["href"]).toMatch(authorinfo.url);
  });
  it('footer - production', () => {
    process.env.NODE_ENV = 'production';
    render(<Footer id={testComponentId} />);
    const component = screen.queryByTestId(testComponentId);
    expect(component).toBeTruthy();
    isCompositeComponentWithType(component, Footer);
    expect(component.textContent).toMatch(appid);
    expect(component.textContent).not.toMatch(`[${appid}]`);
    const repourl = screen.getByText(`${appid}`);
    expect(repourl).toBeTruthy();
    expect(repourl["href"]).toMatch(repoinfo.url);
    expect(component.textContent).toMatch(authorinfo.alias);
    const authorurl = screen.getByText(authorinfo.alias);
    expect(authorurl).toBeTruthy();
    expect(authorurl["href"]).toMatch(authorinfo.url);
  });
});
