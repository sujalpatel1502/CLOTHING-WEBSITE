import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';

import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckOutHandler = () =>{
    navigate('/checkout')
  }
  return(
  <div className='cart-dropdown-container'>
    <div className='cart-items'>
      {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item}/>
         ))}
    </div>
    <Button onClick={goToCheckOutHandler}>GO TO c</Button>
  </div>
  );
  };

export default CartDropdown;


