import React, { useState } from 'react';
import NextApp from 'next/app';
import Router, { withRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';

import ReactLoading from 'react-loading';

const App = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {children}
      {isLoading && (<div className='loading'>
        <ReactLoading type='spinningBubbles' color='#0d6efd' />
      </div>)}
    </>
  );
}

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <App>
        {/* <Provider options={{ site: process.env.NEXTAUTH_URL }}> */}
          <Component {...pageProps} />
        {/* </Provider> */}
      </App>
    );
  }
}

export default withRouter(MyApp);