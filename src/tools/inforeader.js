import packageinfo from '../../package.json';

function getAppid() {
  return packageinfo.appid.toString();
}

function getAppname() {
  return packageinfo.appname[0].toString();
}

export default {
  appid: getAppid,
  appname: getAppname
};