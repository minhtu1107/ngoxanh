import NextApp from 'next/app';
import Router, { withRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import '../styles/style.css';
// import '../styles/player.css';

const App = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
}

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <App>
        <Provider options={{ site: process.env.NEXTAUTH_URL }}>
          <Component {...pageProps} />
        </Provider>
      </App>
    );
  }
}

export default withRouter(MyApp);