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

const getAvatar = (params) => {
  const url = getUrl('getAvatar');
  return axios.get(url, {params:params});
}

const uploadAvatar = (body) => {
  //send to api directly
  let formData = new FormData();

  if(body.coverFile) {
    formData.append('coverFile', body.coverFile[0].file);
  }

  if(body.avatarFile) {
    formData.append('avatarFile', body.avatarFile[0].file);
  }

  if(body.deleteAvatar) {
    formData.append('deleteAvatar', body.deleteAvatar[0]);
  }

  if(body.deleteCover) {
    formData.append('deleteCover', body.deleteCover[0]);
  }

  const params = {
    method: 'post',
    url: 'https://ngoxanh.000webhostapp.com/api/uploadAvatar',
    headers: {
      'Content-Type':'multipart/form-data',
    },
    data: formData,
  };
  return axios(params);
}

export {
  login,
  logout,
  getAvatar,
  uploadAvatar,
};