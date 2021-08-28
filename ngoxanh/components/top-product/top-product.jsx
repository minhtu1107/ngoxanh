import Router from 'next/router';
import Products from '../product/product-list';

const TopProduct = (props) => {
  return (
    <div className='top-product-container'>
      <div className='top-product-title'>Sản phẩm mới</div>
      <a className='view-all' onClick={()=>{Router.push('/product');}}>Xem tất cả</a>
      <div className='top-product'>
        {/* {renderTopProduct()} */}
        <Products
          products={props.products}
        />
      </div>
    </div>
  )
}

export default TopProduct;