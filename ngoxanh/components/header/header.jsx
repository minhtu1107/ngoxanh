import React, { useEffect, useRef, useState } from 'react';

const PageHeader = () => {

  const [isSticky, setSticky] = useState(false);
  const logoRef = useRef(null);
  const handleScroll = () => {
    if (logoRef.current) {
      // console.log('window ' + window.pageYOffset)
      // console.log('ref ' + logoRef.current.getBoundingClientRect().top )
      setSticky(logoRef.current.getBoundingClientRect().top <= 0);
    } else {
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <div className='cover-header'>
      <div className='cover-img'>
        <img className='cover-img' src='/images/header.jpg'/>
      </div>
      <div ref={logoRef}>
        <div className={`logo${isSticky ? ' sticky-logo' : ''}`}>
          <img className='logo-img' src='/images/logo.jpg'/>
          <div>Ngo xanh thien lanh</div>
          <div className='search-header-container'>
            <input
                className="search-header"
                type="text"
                id="header-search"
                placeholder="Tim kiem"
                name="s" 
            />     
          </div>
        </div> 
      </div>
    </div>
  )
}

export default PageHeader