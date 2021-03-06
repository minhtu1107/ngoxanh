import React, { useState, useRef, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import { Close } from '@material-ui/icons';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import { getProducts, createProduct } from '../../services/product';
import { formatVND, vndToInteger } from '../../services/util';

// import ReactQuill from 'react-quill';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AdminHeader from '../../components/admin/header';
import ReactLoading from 'react-loading';

export async function getServerSideProps(context) {
  const user = await getSessionFromContext(context);
  if (!user) {
    redirectTo(context, '/admin/login');
  }

  let ret = {
    props: {
      user,
      secondImage: [],
      image:null,
    }
  };
  const id = parseInt(context.query.pid) || -1;
  console.log('id ' + JSON.stringify(context.query));
  if(id>0) {
    let param = {};
    param['id'] = id;
    const temp = await getProducts(param);
    if(temp.data.data.length>0) {
      console.log(temp.data.data[0]);
      ret.props.product = temp.data.data[0];
      if(ret.props.product.secondary_images != null) {
        ret.props.secondImage = JSON.parse(ret.props.product.secondary_images);
      }
      if(ret.props.product.image != null) {
        ret.props.image = ret.props.product.image;
      }
    }
  }

  return ret;
}

const AddProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [name, setName] = useState(props.product!=undefined?props.product.name:'');
  const [desc, setDesc] = useState(props.product!=undefined?props.product.description:'');
  const [shortDesc, setShortDesc] = useState(props.product!=undefined?props.product.short_description:'');
  const [currentMainImage, setCurrentMainImage] = useState(props.image!=null?props.image:null);
  const [currentSecondImage, setCurrentSecondImage] = useState(props.secondImage);
  const [deleteImages, setDeleteImages] = useState([]);
  const [price, setPrice] = useState(props.product!=undefined?formatVND(props.product.price):'500');

  const [isQillReady, setIsQillReady] = useState(false);

  useEffect(() => {
    setIsQillReady(true);
  }, []);

  const onShortDescChange = (content) => {
    console.log('onChange', content);
    setShortDesc(content.target.value);
  }

  const onDescChange = (content) => {
    console.log('onChange', content);
    setDesc(content);
  }

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status, allFiles) => { 
    console.log("status, meta, file"); 
    console.log(status, meta, allFiles) 
    setImages(allFiles);
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const handleMainImageChangeStatus = ({ meta, file }, status, allFiles) => { 
    setMainImage(allFiles);
  }

  const handleProductName = (e) => {
    let {value} = e.target;
    setName(value);
  }

  const handleProductPrice = (e) => {
    let {value} = e.target;
    setPrice(formatVND(value));
  }

  const editProduct = () => {
    if(name==='') {

    } else {
      let body = {};
      body['name'] = name;
      body['price'] = vndToInteger(price);
      body['desc'] = desc;
      body['shortDesc'] = shortDesc;

      if(mainImage.length>0) {
        body['mainImage'] = mainImage;
      }

      if(images.length>0) {
        body['images'] = images;
        // console.log('body.images');
        // console.log(body.images);
      }

      if(currentMainImage=='deleted') {
        body['currentMainImage'] = 'deleted';
      }

      if(currentSecondImage.length>0) {
        body['secondImages'] = currentSecondImage;
      }

      if(deleteImages.length>0) {
        body['deleteImages'] = deleteImages;
      }

      if(props.product!=undefined) {
        body['pid'] = props.product.id;
      }

      setIsLoading(true);
      createProduct(body)
      .then((res) => {
        console.log(res.data);
        Router.push('/admin/product-management');
      })
      .catch((err) => {
        console.log('res.data');
        console.log(err);
      })
      .finally(()=> {
        setIsLoading(false);
      })
    }
  }

  const handleDeleteMainImage = (img) => {
    setDeleteImages([...deleteImages, img]);
    setCurrentMainImage('deleted');
  }

  const handleDeleteSecondImage = (img) => {
    setDeleteImages([...deleteImages, img]);
    let temp = currentSecondImage.filter(ii=>ii!==img);
    setCurrentSecondImage(temp);
  }

  const renderCurrentImage = (currentList, handleDelete) => {
    console.log('renderCurrentImage ' + currentList);
    return (
      currentList.length > 0 ? currentList.map(img => (
        <div key={img}>
          <div className="dzu-previewContainer" 
          style={{
            justifyContent: 'space-evenly',
            minHeight: 'unset',
            height: 120,
            width: 180,
            float: 'left',
            padding: '40px 1%'
          }}>
            <img className="dzu-previewImage"
              style={{
                maxHeight: 100,
                maxWidth: 'unset'
              }} src={img} />
            <div className="dzu-previewStatusContainer" style={{cursor:'pointer'}}>
              <Close onClick={()=>handleDelete(img)}/>
            </div>
          </div>
        </div>
      )) : (<></>)
    )
  }

  const renderUploadImage = (maxUpload, handleUpload) => {
    let inputContentMsg = 'Drag Files or Click to Browse';
    if(maxUpload > 1) {
      inputContentMsg += ` (Up to ${maxUpload} files)`;
    }
    return (
      maxUpload > 0 ? (
        <Dropzone
          // getUploadParams={getUploadParams}
          onChangeStatus={handleUpload}
          // onSubmit={handleSubmit}
          maxFiles={maxUpload}
          accept="image/*"
          inputContent={inputContentMsg}
          styles={{
            dropzone: {
              overflow: 'auto',
              height: 150,
              flexDirection: 'row',
              alignItems: 'unset',
              display: 'block'
            },
            dropzoneActive: { borderColor: 'green' },
            previewImage: {
              maxHeight: 100,
              maxWidth: 'unset'
            },
            preview: {
              justifyContent: 'space-evenly',
              minHeight: 'unset',
              height: 120, width: 180,
              float: 'left',
              padding: '40px 1%'
            },
            inputLabelWithFiles: {
              alignSelf: 'center',
              margin: '45px 0px 0px 0px',
              width: '100px',
              float: 'left'
            }
          }}
        />
      ) : (<></>)
    )
  }

  return (
    <div>
      <AdminHeader user={props.user}/>
      <div className='admin-container add-product-container'>
        <div style={{textAlign:'center', padding:'30px'}}>
          Th??ng tin s???n ph???m
        </div>
        <table className='add-product-table'>
          <tbody>
            <tr>
              <td className='product-field'>T??n s???n ph???m</td>
              <td className='product-value'>
                <input
                  style={{width:'100%', marginTop:'20px', marginBottom:'20px'}}
                  type='text'
                  id='product-name'
                  placeholder=''
                  name='product-name' 
                  value={name}
                  onChange={handleProductName}
                />  
              </td>
            </tr>
            <tr>
              <td className='product-field'>Gi?? (VND)</td>
              <td className='product-value'>
                <input
                  style={{width:'100%', marginTop:'20px', marginBottom:'20px'}}
                  type='text'
                  id='product-price'
                  placeholder=''
                  name='product-price' 
                  value={price}
                  onChange={handleProductPrice}
                />  
              </td>
            </tr>
            <tr>
              <td>???nh ?????i di???n</td>
              <td>
                {(currentMainImage != null && currentMainImage !== 'deleted')
                  ? renderCurrentImage([currentMainImage], handleDeleteMainImage)
                  : renderUploadImage(1, handleMainImageChangeStatus)}
              </td>
            </tr>
            <tr>
              <td>???nh minh h???a</td>
              <td>
                {renderCurrentImage(currentSecondImage, handleDeleteSecondImage)}
                {renderUploadImage(5-currentSecondImage.length, handleChangeStatus)}
              </td>
            </tr>
            <tr>
              <td>M?? t??? ng???n</td>
              <td>
                <TextareaAutosize className='textarea-short-desc' value={shortDesc} onChange={onShortDescChange} />
              </td>
            </tr>
            <tr>
              <td>M?? t??? chi ti???t</td>
              <td>
                {isQillReady && ReactQuill ? <ReactQuill className='quill-text' value={desc} onChange={onDescChange} />:''}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:'center', padding:'30px'}}>
          <Button variant="primary" onClick={editProduct}>L??u</Button>
        </div>
      </div>
      {isLoading && (<div className='loading'>
        <ReactLoading type='spinningBubbles' color='#0d6efd' />
      </div>)}
    </div>
  )
}

export default AddProduct;
