import Router from 'next/router';
import { logout } from '../../services/user';
import { deleteUserCookie } from '../../services/auth';

const AdminHeader = (props) => {
  const gotoHome = () => {
    Router.push('/admin');
  }

  const signout = async () => {
    await logout();
    deleteUserCookie(null, 'session_token', '/');
    Router.push('/admin/login');
  }

  const gotoProductManagement = () => {
    Router.push('/admin/product-management');
  }

  return (
    <div>
      <div className='logo sticky-logo'>
        <img className='logo-img' src='/images/logo.jpg' onClick={gotoHome}/>
        <div className='header-title' onClick={gotoHome}>Hi, {props.user.userName}</div>
        <div className='search-header-container admin-header'>
          <div className='menu-btn-delim'>
            <input
                // className='search-header'
                type='text'
                id='header-search'
                placeholder='Tim kiem'
                name='s' 
            />   
          </div> 
          <div className='menu-btn menu-btn-delim' onClick={gotoProductManagement}>Quản lý sản phẩm</div>
          <div className='menu-btn' onClick={signout}>Thoát</div> 
        </div>
      </div> 
    </div>
  )
}

export default AdminHeader;