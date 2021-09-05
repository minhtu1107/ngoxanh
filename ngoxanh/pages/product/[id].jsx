import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

import PageHeader from '../../components/header/header';
import StickyPart from '../../components/header/sticky-part';
import sampleData from '../../public/getProducts.json';

export async function getServerSideProps(context) {
  // const user = await getSessionFromContext(context);
  // if (!user) {
    // redirectTo(context, '/auth/signin');
  // }

  // const products = await getProducts();
  /*.then(res => { 
      console.log(res.data);
      return res.data;
    });*/
    
  // console.log(products.data.data);
  const id = context.query.id;

  return {
    props: {
      // user,
      // products: products.data.data,
      product: sampleData.dataList[id-1],
    }
  };
}

const ProductDetail = (props) => {
  // const router = useRouter();
  // const { id } = router.query

  const tes = 'a <br/> b';
  return (
    <div>
      <StickyPart forceSticky={true} />
      <div className='product-detail-container'>
        <div className='product-detail-title'>{props.product.name}</div>
        <div className='desc-container'>
          <div style={{flex:1}}>
            {/* <img src={props.product.image} alt={props.product.name} className='product-detail-img' /> */}
            <Carousel variant="dark">
              <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item>
              <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item>
              <Carousel.Item style={{textAlign: 'center'}}>
                <img src={props.product.image} alt={props.product.name} className='product-detail-img' />
              </Carousel.Item>
            </Carousel>
          </div>
          <div style={{flex:1}}>
            <div className='product-detail-desc-title'>Mô tả:</div>
            <div className='product-detail-desc'
              dangerouslySetInnerHTML={{ __html: props.product.description.replace(/(?:\r\n|\r|\n)/g, '<br>') }}></div>
          </div>
        </div>
      </div>
      
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default ProductDetail
