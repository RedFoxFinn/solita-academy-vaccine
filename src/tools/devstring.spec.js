import isDev from './devstring';

const string = 'testString';

describe('devstring', () => {
  let dummy = false;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('devstring - test', () => {
    expect(process.env.NODE_ENV).toMatch('test');
    const testString = isDev(string);
    expect(testString).toMatch(string);
    expect(testString).toMatch('[');
    expect(testString).toMatch(']');
    expect(testString).toMatch(`[${string}]`);
  });
  it('devstring - dev', () => {
    process.env.NODE_ENV = 'development';
    expect(process.env.NODE_ENV).toMatch('development');
    const testString = isDev(string);
    expect(testString).toMatch(string);
    expect(testString).toMatch('[');
    expect(testString).toMatch(']');
    expect(testString).toMatch(`[${string}]`);
  });
  it('devstring - prod', () => {
    process.env.NODE_ENV = 'production';
    expect(process.env.NODE_ENV).toMatch('production');
    const testString = isDev(string);
    expect(testString).toMatch(string);
    expect(testString).not.toMatch('[');
    expect(testString).not.toMatch(']');
    expect(testString).toMatch(`${string}`);
  });
})
