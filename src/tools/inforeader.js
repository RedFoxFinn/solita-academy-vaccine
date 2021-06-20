/* eslint-disable import/no-anonymous-default-export */
import packageinfo from '../../package.json';

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

export default {
  appid: getAppid,
  appname: getAppname,
  authorinfo: getAuthorinfo,
  repoinfo: getRepoinfo
};