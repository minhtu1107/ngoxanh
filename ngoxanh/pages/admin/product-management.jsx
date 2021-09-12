import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import { getProducts, deleteProduct } from '../../services/product';

import { Edit, Delete, AddBox } from '@material-ui/icons';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

// import 'bootstrap/dist/css/bootstrap.css';
import ReactLoading from 'react-loading';
import AdminHeader from '../../components/admin/header';

export async function getServerSideProps(context) {
  const user = await getSessionFromContext(context);
  if (!user) {
    redirectTo(context, '/admin/login');
  }

  // console.log('user ' + user.userName);
  const products = await getProducts();
  /*.then(res => { 
      console.log(res.data);
      return res.data;
    });*/
    
  console.log(products.data.data);

  return {
    props: {
      user,
      products: products.data.data,
    }
  };
}

const ProductManagement = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(props.products);
  const [isSticky, setSticky] = useState(false);
  const headerRef = useRef(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deteteName, setDeleteName] = useState('');
  const [deteteId, setDeleteId] = useState(-1);

  const handleScroll = () => {
    if (headerRef.current) {
      // console.log('window ' + window.pageYOffset)
      console.log('ref ' + headerRef.current.getBoundingClientRect().top )
      setSticky(headerRef.current.getBoundingClientRect().top <= 50);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const AddProduct = () => {
    Router.push('/admin/product');
  }

  const DeleteProduct = (id) => {
    setIsLoading(true);
    deleteProduct(id)
    .then((res) => {
      console.log(res.data);
      const refreshProduct = getProducts().then(ress => { 
        console.log("ress   " + ress.data.data);
        setProducts(ress.data.data);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      setIsLoading(false);
    })
  }

  const EditProduct = (id) => {
    Router.push('/admin/product?pid=' + id);
  }

  const handleDeleteClick = (name, id) => {
    setDeleteName(name);
    setDeleteId(id);
    setShowDeletePopup(true);
  }

  const renderProductTable = () => {
    return (
      (products != undefined && products.length > 0) ? products.map(p => (
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.name}</td>
          <td> 
            <div style={{display:'flex'}}>
              <div className='option-btn' onClick={() => {EditProduct(p.id)}}>
                <Edit style={{verticalAlign:'midde'}}/>
                <div>Sửa</div>
              </div>
              <div className='option-btn' onClick={() => {handleDeleteClick(p.name, p.id)}}>
                <Delete style={{verticalAlign:'midde'}}/>
                <div>Xóa</div>
              </div>
            </div>
          </td>
        </tr>
      )) : (<tr>
        <td colSpan='3'>Chưa có sản phẩm</td>
      </tr>)
    )
  }

  const handlePopupDeleteClick = () => {
    setShowDeletePopup(false);
    setDeleteName('');
    setDeleteId(-1);
    DeleteProduct(deteteId);
  }

  const handlePopupCancelClick = () => {
    setShowDeletePopup(false);
    setDeleteName('');
    setDeleteId(-1);
  } 

  const renderModal = () => {
    return (
      <Modal show={true}>
        <Modal.Body>Xóa sản phẩm <span style={{color:'blue', fontWeight:'bold'}}>{deteteName}</span>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupCancelClick}>
            Không
          </Button>
          <Button variant="primary" onClick={handlePopupDeleteClick}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div>
      <AdminHeader user={props.user}/>
      <div className='admin-container'>
        <div className='product-management-container'>
          <div className='product-management-title'>Danh sách sản phẩm</div>
          <table className='product-table'>
            <thead ref={headerRef} className={`${isSticky ? 'product-table-header-sticky' : ''}`}>
              <tr>
                <th className='col-id'>Id</th>
                <th className='col-name'>Tên sản phẩm</th>
                <th className='col-option'>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <div style={{flex:1}}>Tùy chỉnh</div>
                    <div className='option-btn' onClick={AddProduct}>
                      <AddBox style={{verticalAlign:'midde'}}/>
                      <div>Thêm</div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderProductTable()}
            </tbody>
          </table> 
        </div>
      </div>
      <div style={{minHeight:'10vh'}}></div>
      {showDeletePopup && renderModal()}
      {isLoading && (<div className='loading'>
        <ReactLoading type='spinningBubbles' color='#0d6efd' />
      </div>)}
    </div>
  )
}

export default ProductManagement;
