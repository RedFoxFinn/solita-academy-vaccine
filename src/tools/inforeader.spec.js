import inforeader from './inforeader';
import packageinfo from '../../package.json';
import vaccineSample from '../data/vaccinesample.json';
import vaccinationSample from '../data/vaccinationsample.json';

describe('inforeader', () => {
  let dummy = false;
  it('dummy', () => {
    expect(dummy).toBe(false);
    dummy = true;
    expect(dummy).toBe(true);
  });
  it('appid', () => {
    const appid = inforeader.appid();
    expect(appid).toBeTruthy();
    expect(appid).toMatch(packageinfo.appid);
  });
  it('appname', () => {
    const appname = inforeader.appname();
    expect(appname).toBeTruthy();
    expect(appname).toMatch(packageinfo.appname[0]);
  });
  it('authorinfo', () => {
    const authorinfo = inforeader.authorinfo();
    expect(authorinfo).toBeTruthy();
    expect(authorinfo.name).toMatch(packageinfo.author.name);
    expect(authorinfo.alias).toMatch(packageinfo.author.alias);
    expect(authorinfo.url).toMatch(packageinfo.author.url);
  });
  it('repoinfo', () => {
    const repoinfo = inforeader.repoinfo();
    expect(repoinfo).toBeTruthy();
    expect(repoinfo.type).toMatch(packageinfo.repository.type);
    expect(repoinfo.url).toMatch(packageinfo.repository.url);
  });
  it('vaccineSample', () => {
    const sample = inforeader.vaccineSample();
    expect(sample).toBeTruthy();
    expect(sample).toEqual(vaccineSample);
  });
  it('vaccinationSample', () => {
    const sample = inforeader.vaccinationSample();
    expect(sample).toBeTruthy();
    expect(sample).toEqual(vaccinationSample);
  });
})
