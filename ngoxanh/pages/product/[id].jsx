import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getProducts } from '../../services/product';
import styles from '../../styles/Home.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

import PageHeader from '../../components/header/header';
import PageFooter from '../components/footer/footer';
import StickyPart from '../../components/header/sticky-part';
import sampleData from '../../public/getProducts.json';

import { formatVND } from '../../services/util';

export async function getServerSideProps(context) {
  // const user = await getSessionFromContext(context);
  // if (!user) {
    // redirectTo(context, '/auth/signin');
  // }

  const id = parseInt(context.query.id) || -1;
  let product = null;
  if(id>0) {
    let param = {};
    param['id'] = id;
    const temp = await getProducts(param);
    if(temp.data.data.length>0) {
      console.log(temp.data.data[0]);
      product = temp.data.data[0];
      if(product.secondary_images != null) {
        product.secondImage = JSON.parse(product.secondary_images);
      }
    }
  }

  if(product == null)
    redirectTo(context, '/error');

  return {
    props: {
      // user,
      // products: products.data.data,
      product: product,
    }
  };
}

const ProductDetail = (props) => {
  // const router = useRouter();
  // const { id } = router.query;

  const renderSlideImage = () => {
    let temp = props.product.secondImage;
    if(!temp || temp.length <=0) {
      if(props.product.image)
        temp = [props.product.image];
      else
        temp = ['/images/no-image.png'];
    }
    return (
      temp.map((p, idx) => (
        <Carousel.Item style={{textAlign: 'center'}} key={idx}>
          <img src={p} alt={props.product.name} className='product-detail-img' />
        </Carousel.Item>
      ))
    )
  }

  return (
    <div>
      <StickyPart forceSticky={true} />
      <div className='product-detail-container'>
        <div className='product-detail-title'>{props.product.name}</div>
        <div className='desc-container'>
          <div className='desc-slide-container'>
            <Carousel variant="dark">
              {/* <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item>
              <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item>
              <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item> */}
              {renderSlideImage()}
            </Carousel>
          </div>
          <div className='product-detail-desc-container'>
            <div className='product-detail-desc-title'>{'Giá: ' + formatVND(props.product.price) + 'VNĐ'}</div>
            <div className='product-detail-desc-title'>Mô tả:</div>
            <div className='product-detail-desc'
              dangerouslySetInnerHTML={{ __html: props.product.description.replace(/(?:\r\n|\r|\n)/g, '<br>') }}></div>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <PageFooter />
        <div style={{minHeight:'10vh'}}></div>
      </footer>
    </div>
  )
}

export default ProductDetail
