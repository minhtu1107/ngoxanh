import axios from 'axios';
import qs from 'qs';
import { getDefaultHeaders, getUrl } from './util';

const getProducts = (params) => {
  const url = getUrl('getProducts');
  // console.log("urllll + " +url)
  return axios.get(url);
}

const deleteProduct = (params) => {
  const url = getUrl('deleteProduct');
  // console.log("urllll + " +url)
  return axios.delete(url, {data:params});
}

const createProduct = (body) => {
  // const url = getUrl('createProduct');
  // console.log("urllll + " +url)
  // return axios.post(url, params);

  //directly send to api
  let formData = new FormData();
  formData.append('name', body.name);

  const params = {
    method: 'post',
    url: 'https://ngoxanh.000webhostapp.com/api/createProduct',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'multipart/form-data',
    },
    data: formData,
  };

  console.log(params.url)
  return axios(params);
    // .then((response) => {
    //   console.log("success", response.data);
    //   res.status(200);
    //   res.json(response.data);
    //   return res.end();
    // })
    // .catch((err) => {
    //   console.log("err", err);
    //   res.status(err.response.status);
    //   res.json(err.response.data);
    //   // res.json({ name: 'John Doe' });
    //   return res.end();
    // });
}

export {
  getProducts,
  deleteProduct,
  createProduct
};