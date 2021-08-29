import { useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { getSessionFromContext } from '../../services/auth';
import { getProducts } from '../../services/product';

import styles from '../../styles/Home.module.css'

import PageHeader from '../../components/header/header';
import Products from '../../components/product/product-list';
import sampleData from '../../public/getProducts.json'

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

  return {
    props: {
      // user,
      // products: products.data.data,
      products: sampleData.dataList,
    }
  };
}

export default function Home(props) {

  const [products, setProducts] = useState(props.products);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ngo xanh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <div className='top-product-container'>
        <div className='top-product-title'>Sản phẩm</div>
        <div className='top-product'>
          <Products
            products={products}
          />
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
