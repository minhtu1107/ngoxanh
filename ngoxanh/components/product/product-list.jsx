import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Products = (props) => {
  const shortDescLength = 120;
  return (
    (props.products != undefined && props.products.length > 0) ? props.products.map(p => (
      <div key={p.id} className='product'>
        <Card className='product-card'>
          <div className='card-img-container'>
            <Card.Img variant='top' src={p.image} className='card-img-custom' />
          </div>
          <Card.Body className='card-product-body'>
            <Card.Title className='product-title'>{p.name}</Card.Title>
            <Card.Text className='product-desc'>
              {p.short_description.length >= shortDescLength ?
                p.short_description.substr(0, shortDescLength) + '...'
                : p.short_description}
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

export default Products;