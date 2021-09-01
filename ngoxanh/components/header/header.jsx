import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import StickyPart from '../../components/header/sticky-part';

const PageHeader = (props) => {
  return (
    <div className='cover-header'>
      <div className='cover-img'>
        <img className='cover-img' src='/images/header.jpg'/>
      </div>
      <StickyPart />
    </div>
  )
}

export default PageHeader