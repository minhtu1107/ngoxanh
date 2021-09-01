import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

const StickyPart = (props) => {

  const [isSticky, setSticky] = useState(props.forceSticky?true:false);
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

  return (
    <div ref={logoRef}>
      <div className={`logo${isSticky ? ' sticky-logo' : ''}`}>
        <img className='logo-img' src='/images/logo.jpg' onClick={gotoHome}/>
        <div className={`header-title${isSticky ? '' : ' header-title-sticky'}`} onClick={gotoHome}>Ngo xanh thien lanh</div>
        <div className='search-header-container'>
          <input
              className='search-header'
              type='text'
              id='header-search'
              placeholder='Tim kiem'
              name='s' 
          />     
        </div>
      </div> 
    </div>
  )
}

export default StickyPart