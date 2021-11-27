import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import StickyPart from '../../components/header/sticky-part';

const PageHeader = (props) => {
  return (
    <div className='cover-header'>
      <div className='cover-img'>
        <img className='cover-img' src={props.cover?props.cover:'/images/header.jpg'}/>
      </div>
      <StickyPart avatar={props.avatar} name={props.name}/>
    </div>
  )
}

export default PageHeader