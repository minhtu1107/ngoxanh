import StickyPart from '../../components/header/sticky-part';
import { Place, Email, Phone, Facebook } from '@material-ui/icons';

export default function Contact(props) {

  return (
    <div>
      <StickyPart forceSticky={true} />
    
      <div className='contact-container'>
        <div className='product-management-title'>Thông tin liên hệ</div>
        <div className='contact-detail'>
          <div className='contact-item'> 
            <Place/> 
            <div style={{padding:5}}>Địa chỉ: Thôn Ung Chiếm - Xã Hàm Thắng - Huyện Hàm Thuận Bắc - Bình Thuận</div>
          </div>
          <div className='contact-item'> 
            <Facebook/> 
            <div style={{padding:5}}>Facebook: <a href='https://www.facebook.com/Ngõ-Xanh-Thiện-Lành-100327598522537/' target="_blank">https://www.facebook.com/Ngõ-Xanh-Thiện-Lành/</a></div>
          </div>
          <div className='contact-item'> 
            <Phone/> 
            <div style={{padding:5}}>Điện thoại/Zalo: 094 456 3963</div>
          </div>
        </div>
      </div>
    </div>
  )
}