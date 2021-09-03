import { useRouter } from 'next/router';
import { redirectTo } from '../../services/util';
import { getSessionFromContext } from '../../services/auth';

// import 'bootstrap/dist/css/bootstrap.css';

// import sampleData from '../../public/getProducts.json';

import AdminHeader from '../../components/admin/header';

export async function getServerSideProps(context) {
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
  return (
    <div>
      <AdminHeader user={props.user}/>
      <div className='admin-container'>
        Admin page
      </div>
    </div>
  )
}

export default Admin;
