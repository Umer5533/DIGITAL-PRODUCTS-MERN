import React from 'react'
import { useCart } from '../context/CartContext'

const ProductSingleCard = ({product}) => {
  const {addToCart, removeFromCart, cartItems} = useCart();
  const itemInCart = cartItems.find(item => item._id === product._id);

  const quantity = itemInCart ? itemInCart.quantity : 0; 

  const handleAddToCart = () =>{
    addToCart(product);
  };

  const handleRemoveFromCart = () =>{
    removeFromCart(product._id);
  }
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      className='w-full h-[200px] object-cover object-center'
      src={product.image}
      alt={product.image} />
  </figure>
  <div className="card-body bg-base-200">
    <h2 className="card-title">{product.name}</h2>
    <p>{product.description || 'No description available.'}</p>
    <div className="price">
        ${(product.priceInCents / 100).toFixed(2)}
    </div>

    <div className='cart-actions justify-end'>
      {
        quantity > 0 ? (
          <button className='btn btn-error' onClick={handleRemoveFromCart}>Remove from Cart</button>
        ) : (
          <button className='btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
        )
      }
    </div>
  </div>
</div>
  )
}

export default ProductSingleCard