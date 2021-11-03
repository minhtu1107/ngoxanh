import Router, { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import AdminHeader from '../../components/admin/header';
import { setUserCookie } from '../../services/auth';

export async function getServerSideProps(context) {
  let session = {
    userName: 'ngoxanhthienlanh',
  }
  setUserCookie(context, 'session_token', session);

  const user = await getSessionFromContext(context);
  if (!user) {
    redirectTo(context, '/admin/login');
  }

  // console.log('user ' + user.userName);
  return {
    props: {
      user,
    }
  };
}

const Admin = (props) => {

  const gotoAvatarManagement = () => {
    Router.push('/admin/site-photo');
  }

  const gotoProductManagement = () => {
    Router.push('/admin/product-management');
  }

  return (
    <div>
      <AdminHeader user={props.user}/>
      <div className='admin-container'>
        <div className='admin-panel'>
          <div className='btn-container'>
            <Button className='btn-admin' variant='primary' onClick={gotoAvatarManagement}>Ảnh đại diện</Button>
          </div>
          <div className='btn-container'>
            <Button className='btn-admin' variant='primary' onClick={gotoProductManagement}>Quản lý sản phẩm</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;
