import React, { useState } from 'react';
import Router from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import { login } from '../../services/user';
import { setUserCookie } from '../../services/auth';

// import 'bootstrap/dist/css/bootstrap.css';

// import sampleData from '../../public/getProducts.json';

export async function getServerSideProps(context) {
  const user = await getSessionFromContext(context);
  if (user) {
    redirectTo(context, '/admin');
  }

  return {
    props: {
      // user,
    }
  };
}

const Login = (props) => {
  const [errLogin, setErrLogin] = useState('');
  const [userLogin, setUserLogin] = useState({userName: '', password: ''});
  //Handle input change
  const handleOnChange = (e) => {
    let {name,value} = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // const csrfToken = await getCsrfToken();

    let userName = userLogin.userName;
    let password = userLogin.password;

    if(userName !== '' && password !== '') {
      login({ userName, password })
        .then((response) => {
          console.log(response.data)
          if(response.data.userName) {
            let session = {
              userName: response.data.userName,
            }

            setUserCookie(null, 'session_token', session);
            Router.push('/admin');
          } else {
            setErrLogin('lang.login.un_authentication');
          }
          
          
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div className='form-login'>
      <form className='form' onSubmit={handleOnSubmit}>
        <div className='form-group'>
          <input 
            type='text'
            name='userName' 
            className='c-textField' 
            placeholder={'Enter user name'} 
            onChange={handleOnChange}/>
        </div>

        <div className='form-group'>
          <input 
            type='password'
            name='password' 
            className='c-textField' 
            placeholder={'Enter password'} 
            onChange={handleOnChange}/>
        </div>

        {errLogin &&
          <div className="form-error">
            <p>{errLogin}</p>
          </div>
        }

        <div className='form-action'>
          <button className='c-btn' type='submit'>{'Log-in'}</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
