import { Link } from '@inertiajs/react'

function List(props) {
  const products = props.products
  const productsList = products.map(product => (
    <Link key={product.id} href={`/form?product=${product.id}`} className="card">
      {product.image && (
        <img src={`/storage/${product.image}`} alt={product.name} />
      )}
      <div className="card-info">
        <p className="card-name">{product.name}</p>
        <p className="card-price">{product.price}DA</p>
      </div>
    </Link>
  ))
  return <div className="cards-container">{productsList}</div>
}

export default List