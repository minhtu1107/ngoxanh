import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Select from 'react-select';
import { getProducts } from '../../services/product';

const StickyPart = (props) => {

  const [isSticky, setSticky] = useState(props.forceSticky?true:false);
  const [name, setName] = useState(props.name);

  const logoRef = useRef(null);
  const handleScroll = () => {
    if (logoRef.current && !props.forceSticky) {
      // console.log('window ' + window.pageYOffset)
      // console.log('ref ' + logoRef.current.getBoundingClientRect().top )
      setSticky(logoRef.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const gotoHome = () => {
    Router.push('/');
  }

  const handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    if(selectedOption && selectedOption.value) {
      Router.push(`/product/${selectedOption.value}`);
    }
  };

  const handleOpen = () => {
    console.log(`Option handleOpen:`);
    if(name.length==0) {
      const products = getProducts().then(res => { 
        // console.log(res.data);
        let listProduct = res.data.data.map(prod => {
          let t={value: prod.id, label: prod.name};
          return t;
        })
        setName(listProduct);
      });
    }
  };

  const LoadingIndicator = () => {
    return <></>;
  }
  return (
    <div ref={logoRef}>
      <div className={`logo${isSticky ? ' sticky-logo' : ''}`}>
        <img className='logo-img' src={props.avatar?props.avatar:'/images/logo.jpg'} onClick={gotoHome}/>
        <div className={`header-title${isSticky ? '' : ' header-title-sticky'}`} onClick={gotoHome}>Ngo xanh thien lanh</div>
        <div className='search-header-container admin-header'>
          {/* <div className='menu-btn-delim'>
            <input
                // className='search-header'
                type='text'
                id='header-search'
                placeholder='Tim kiem'
                name='s' 
            />     
          </div> */}
          <Select 
            className='search-header'
            options={name} 
            placeholder='Tên sản phẩm...' 
            isClearable={true} 
            isSearchable={true} 
            onChange={handleChange} 
            instanceId='header select prod'
            onMenuOpen={handleOpen}
            isLoading={true}
            components={{LoadingIndicator}}
            />
          <div className='menu-btn' onClick={()=>{Router.push('/contact');}}>Liên hệ</div>
        </div>
      </div> 
    </div>
  )
}

export default StickyPart