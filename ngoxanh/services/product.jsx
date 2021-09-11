import axios from 'axios';
import qs from 'qs';
import { getDefaultHeaders, getUrl } from './util';

const getProducts = (params) => {
  const url = getUrl('getProducts');
  // console.log("urllll + " +url)
  return axios.get(url, {params:params});
}

const deleteProduct = (id) => {
  // const url = getUrl('deleteProduct');
  // console.log("urllll + " +url)
  // return axios.delete(url, {data:params});

  //send to api directly
  let formData = new FormData();
  formData.append('productId', id);

  const params = {
    method: 'post',
    url: 'https://ngoxanh.000webhostapp.com/api/deleteProduct',
    headers: {
      'Content-Type':'multipart/form-data',
    },
    data: formData,
  };
  return axios(params);
}

const createProduct = (body) => {
  // const url = getUrl('createProduct');
  // console.log("urllll + " +url)
  // return axios.post(url, params);

  //send to api directly
  let formData = new FormData();
  formData.append('name', body.name);
  formData.append('desc', body.desc);
  formData.append('shortDesc', body.shortDesc);

  if(body.mainImage) {
    formData.append('mainImage', body.mainImage[0].file);
    console.log(body.mainImage);
  }

  if(body.currentMainImage) {
    formData.append('deleteMainImage', 'deleted');
  }

  if(body.images) {
    body.images.forEach(f => {
      // console.log(f.file);
      formData.append('images[]', f.file);
    });
  }

  if(body.secondImages) {
    body.secondImages.forEach(f => {
      // console.log(f.file);
      formData.append('secondImages[]', f);
    });
  }

  if(body.deleteImages) {
    body.deleteImages.forEach(f => {
      // console.log(f.file);
      formData.append('deleteImages[]', f);
    });
  }

  if(body.pid) {
    formData.append('pid', body.pid);
  }

  const params = {
    method: 'post',
    url: 'https://ngoxanh.000webhostapp.com/api/createProduct',
    headers: {
      'Content-Type':'multipart/form-data',
    },
    data: formData,
  };
  return axios(params);
}

export {
  getProducts,
  deleteProduct,
  createProduct
};