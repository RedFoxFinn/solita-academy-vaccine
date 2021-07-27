/* eslint-disable import/no-anonymous-default-export */
import packageinfo from '../../package.json';
import home from '../data/home.json';

import vaccineSample from '../data/vaccinesample.json';
import vaccinationSample from '../data/vaccinationsample.json';

function getAppid() {
  return packageinfo.appid.toString();
}

function getAppname() {
  return packageinfo.appname[0].toString();
}

function getAuthorinfo() {
  return packageinfo.author;
}

function getRepoinfo() {
  return packageinfo.repository;
}

function getVaccineSample() {
  return vaccineSample;
}

function getVaccinationSample() {
  return vaccinationSample;
}

function getHome() {
  return home;
}

export default {
  appid: getAppid,
  appname: getAppname,
  authorinfo: getAuthorinfo,
  home: getHome,
  repoinfo: getRepoinfo,
  vaccineSample: getVaccineSample,
  vaccinationSample: getVaccinationSample
};