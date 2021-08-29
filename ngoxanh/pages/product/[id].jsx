import { useRouter } from 'next/router'

const ProductDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default ProductDetail
