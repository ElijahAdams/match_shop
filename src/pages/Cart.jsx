import { React, useContext } from 'react'
import { CartContext } from '../App';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  return (
    <>
    {cart.map((c) => (
      <p key={c.name}>{c.name}</p>
    ))}
    </>
  )
}

export default Cart