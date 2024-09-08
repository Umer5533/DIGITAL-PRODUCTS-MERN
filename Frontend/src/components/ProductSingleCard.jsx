import React from 'react'

const ProductSingleCard = ({product}) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      className='w-full h-[200px] object-cover object-center'
      src={product.image}
      alt={product.image} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.name}</h2>
    <p>{product.description || 'No description available.'}</p>
    <div className="price">
        ${(product.priceInCents / 100).toFixed(2)}
    </div>
  </div>
</div>
  )
}

export default ProductSingleCard