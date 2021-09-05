import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import { getProducts, deleteProduct } from '../../services/product';

import { Edit, Delete, AddBox } from '@material-ui/icons';

// import 'bootstrap/dist/css/bootstrap.css';

import AdminHeader from '../../components/admin/header';

// import sampleData from '../../public/getProducts.json';
// import AddProduct from './add-product';

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
  const [products, setProducts] = useState(props.products);
  const [isSticky, setSticky] = useState(false);
  const headerRef = useRef(null);
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
    deleteProduct(id)
    .then((res) => {
      console.log(res.data);
      const refreshProduct = getProducts().then(ress => { 
        // console.log("ress   " + JSON.stringify(ress.data.data));
        setProducts(ress.data.data);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      // setIsLoading(false);
    })
  }

  const EditProduct = (id) => {
    Router.push('/admin/product?pid=' + id);
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
              <div className='option-btn' onClick={() => {DeleteProduct(p.id)}}>
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
                      <div>Them</div>
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
    </div>
  )
}

export default ProductManagement;
