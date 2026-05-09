import { Link } from '@inertiajs/react'

function List(props) {
  const products = props.products
  const productsList = products.map(product => (
    <Link key={product.id} href={`/form?product=${product.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        {(() => {
          if (product.image) {
            return <img src={`/storage/${product.image}`} alt={product.name} />
          }
        })()}
        <p className="card-name">{product.name}</p>
        <p className="card-price">{product.price}DA</p>
      </div>
    </Link>
  ))
  return <div className="cards-container">{productsList}</div>
}

export default List