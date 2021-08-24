import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TopProduct = (props) => {
  const renderTopProduct = () => {
    // console.log("products prop ===== ");
    // console.log(props.products);

    return (
      (props.products != undefined && props.products.length > 0)?props.products.map(p => (
        <div key={p.id} className='product'>
          <Card style={{ width: '250px' }}>
            <div className='card-img-container'>
              <Card.Img variant='top' src={p.image} className='card-img-custom' />
            </div>
            <Card.Body>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>
                {p.short_description}
              </Card.Text>
              <Card.Link href="#">Chi tiết</Card.Link>
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
      <div className='top-product-title'>Xem nhiều nhất</div>
      <div className='top-product'>
        {renderTopProduct()}
      </div>
      {/* <div>
        <Card style={{ width: '18rem' }}>
          <div className='card-img-container'>
            <Card.Img variant="top" src="/mi_gao_luc.jpg" className='card-img-custom' />
          </div>
          <Card.Body>
            <Card.Title>Mi gao luc</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Chi tiet</Card.Link>
          </Card.Body>
        </Card>
      </div> */}
    </div>
  )
}

export default TopProduct;