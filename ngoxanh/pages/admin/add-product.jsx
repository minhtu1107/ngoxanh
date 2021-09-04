import { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

// import 'bootstrap/dist/css/bootstrap.css';

// import sampleData from '../../public/getProducts.json';

import React, { Component, useState } from 'react';
// import ReactQuill from 'react-quill';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AdminHeader from '../../components/admin/header';

export async function getServerSideProps(context) {
  const user = await getSessionFromContext(context);
  if (!user) {
    redirectTo(context, '/admin/login');
  }

  // console.log('user ' + user.userName);
  return {
    props: {
      user,
    }
  };
}

const AddProduct = (props) => {
  const [shortDesc, setShortDesc] = useState('short desc');
  const onShortDescChange = (content) => {
    console.log('onChange', content);
    setShortDesc(content);
  }

  const [desc, setDesc] = useState('desc');
  const onDescChange = (content) => {
    console.log('onChange', content);
    setDesc(content);
  }

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log("status, meta, file"); console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div>
      <AdminHeader user={props.user}/>
      <div className='admin-container add-product-container'>
        <div style={{textAlign:'center', padding:'30px'}}>
          Thông tin sản phẩm
        </div>
        <table className='add-product-table'>
          <tbody>
            <tr>
              <td className='product-field'>Tên sản phẩm</td>
              <td className='product-value'>
                <input
                  style={{width:'100%', marginTop:'20px', marginBottom:'20px'}}
                  type='text'
                  id='product-name'
                  placeholder=''
                  name='product-name' 
                />  
              </td>
            </tr>
            <tr>
              <td>Hình ảnh</td>
              <td>
                <Dropzone
                  // getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  // onSubmit={handleSubmit}
                  maxFiles={5}
                  accept="image/*"
                  inputContent="Drag Files or Click to Browse (Up to 5 files)"
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
              </td>
            </tr>
            <tr>
              <td>Mô tả ngắn</td>
              <td>
                <ReactQuill className='quill-text' value={shortDesc} onChange={onShortDescChange} />
              </td>
            </tr>
            <tr>
              <td>Mô tả chi tiết</td>
              <td>
                <ReactQuill className='quill-text' value={desc} onChange={onDescChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:'center', padding:'30px'}}>
          <Button variant="primary">Lưu</Button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;
