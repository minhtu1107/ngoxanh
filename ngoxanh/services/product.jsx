import axios from 'axios';
import qs from 'qs';
import { getDefaultHeaders, getUrl } from './util';

const getProducts = (params) => {
  const url = getUrl('user1');
  console.log("urllll + " +url)
  return axios.get(url);
}

export {
  getProducts,
};