import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Products = (props) => {
  const renderProduct = () => {

    return (
      (props.products != undefined && props.products.length > 0)?props.products.map(p => (
        <div key={p.id} className='product'>
          {/* <Card style={{ width: '250px' }}> */}
          <Card>
            <div className='card-img-container'>
              <Card.Img variant='top' src={p.image} className='card-img-custom' />
            </div>
            <Card.Body className='card-product-body'>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>
                {p.short_description.length>=120? p.short_description.substr(0, 120) + '...' : p.short_description}
              </Card.Text>
              {/* <Card.Link href="#">Chi tiết</Card.Link> */}
            </Card.Body>
          </Card>
        </div>
      )) : (<div>
        Không có sản phẩm
      </div>)
    )
  }

  return (
    <div className='top-product-container'>
      <div className='top-product-title'>Sản phẩm</div>
      <div className='top-product'>
        {renderProduct()}
      </div>
    </div>
  )
}

export default Products;