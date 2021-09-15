import StickyPart from '../../components/header/sticky-part';
import { Place, Email, Phone } from '@material-ui/icons';

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
            <Email/> 
            <div style={{padding:5}}>Email: abc@gmail.com</div>
          </div>
          <div className='contact-item'> 
            <Phone/> 
            <div style={{padding:5}}>Điện thoại: 090 000 0010</div>
          </div>
        </div>
      </div>
    </div>
  )
}