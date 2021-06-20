import uuid from 'uuid';
import idGen from './idGen';

describe('tool unit tests - idGen', () => {
  let dummy = false;
  const appId = uuid;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('default', () => {
    const gen = idGen(`${appId}`,'default');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.default`);
  });
  it('frontend', () => {
    const gen = idGen(`${appId}`, 'frontend');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.frontend`);
  });
  it('header', () => {
    const gen = idGen(`${appId}`, 'header');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.header`);
  });
  it('heading', () => {
    const gen = idGen(`${appId}`, 'heading');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.heading`);
  });
  it('footer', () => {
    const gen = idGen(`${appId}`, 'footer');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.footer`);
  });
  it('order', () => {
    const gen = idGen(`${appId}`, 'order', 5);
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.order.5`);
  });
  it('vaccination', () => {
    const gen = idGen(`${appId}`,'vaccination','vacc12');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.vaccination.vacc12`);
  });
  it('navigator', () => {
    const gen = idGen(`${appId}`,'navigator');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.navigator`);
  });
  it('navlink', () => {
    const gen = idGen(`${appId}`, 'navlink','toHome');
    expect(gen).toBeTruthy();
    expect(gen).toMatch(`${appId}.navlink.toHome`);
  });
});