import React, { useState, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import { Close } from '@material-ui/icons';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AdminHeader from '../../components/admin/header';
import ReactLoading from 'react-loading';
import { getAvatar, uploadAvatar } from '../../services/user';

export async function getServerSideProps(context) {
  const user = await getSessionFromContext(context);
  if (!user) {
    redirectTo(context, '/admin/login');
  }

  let param = {};
  param['isAdmin'] = 'isAdmin';
  const temp = await getAvatar(param);
  console.log(temp.data);

  let ret = {
    props: {
      user,
      avatar:temp.data.avatar,
      cover:temp.data.cover,
    }
  };

  return ret;
}

const SitePhoto = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(props.cover);
  const [avatarImage, setAvatarImage] = useState(props.avatar);

  const [coverFile, setCoverFile] = useState([]);
  const [avatarFile, setAvatarFile] = useState([]);
  const [deleteCover, setDeleteCover] = useState([]);
  const [deleteAvatar, setDeleteAvatar] = useState([]);

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleAvatarChangeStatus = ({ meta, file }, status, allFiles) => { 
    setAvatarFile(allFiles);
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const handleCoverChangeStatus = ({ meta, file }, status, allFiles) => { 
    setCoverFile(allFiles);
  }

  const uploadImages = () => {
      let body = {};

      if(deleteCover.length>0) {
        body['deleteCover'] = deleteCover;
      }

      if(coverFile.length>0) {
        body['coverFile'] = coverFile;
        if(deleteCover.length<=0 && coverImage!=null) {
          body['deleteCover'] = [coverImage];
        }
      }

      if(deleteAvatar.length>0) {
        body['deleteAvatar'] = deleteAvatar;
      }

      if(avatarFile.length>0) {
        body['avatarFile'] = avatarFile;
        if(deleteAvatar.length<=0 && avatarImage!=null) {
          body['deleteAvatar'] = [avatarImage];
        }
      }

      setIsLoading(true);
      uploadAvatar(body)
      .then((res) => {
        console.log(res.data);
        Router.push('/admin');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=> {
        setIsLoading(false);
      })
  }

  const handleDeleteCoverImage = (img) => {
    setDeleteCover([img]);
    setCoverImage(null);
  }

  const handleDeleteAvatarImage = (img) => {
    setDeleteAvatar([img]);
    setAvatarImage(null);
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
        <div className='product-management-title'>
          Quản lý ảnh
        </div>
        <table className='add-product-table'>
          <tbody>
            <tr>
              <td className='product-field'>Ảnh cover</td>
              <td className='product-value'>
                {/* {(currentMainImage != null && currentMainImage !== 'deleted')
                  ? renderCurrentImage([currentMainImage], handleDeleteMainImage)
                  : renderUploadImage(1, handleMainImageChangeStatus)} */}
                {(coverImage!=null) && renderCurrentImage([coverImage], handleDeleteCoverImage)}
                {renderUploadImage(1, handleCoverChangeStatus)}
              </td>
            </tr>
            <tr>
              <td>Ảnh avatar</td>
              <td>
                {(avatarImage!=null) && renderCurrentImage([avatarImage], handleDeleteAvatarImage)}
                {renderUploadImage(1, handleAvatarChangeStatus)}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{textAlign:'center', padding:'30px'}}>
          <Button variant="primary" onClick={uploadImages}>Lưu</Button>
        </div>
      </div>
      {isLoading && (<div className='loading'>
        <ReactLoading type='spinningBubbles' color='#0d6efd' />
      </div>)}
    </div>
  )
}

export default SitePhoto;
