import axios from 'axios';
import qs from 'qs';
import { getDefaultHeaders, getUrl } from './util';

const login = (params) => {
  const url = getUrl('oauth/token');
  // console.log("request login  " + url);
  return axios.post(url, qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : "Basic " + Buffer.from("cntl:secret").toString('base64'),
    }
  });
}

const logout = (params) => {
  const url = getUrl('oauth/logout');
  return axios.post(url, params);
}

export {
  login,
  logout,
};