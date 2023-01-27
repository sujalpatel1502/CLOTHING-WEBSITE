
// import { createContext, useState } from 'react';

// const addCartItem = (cartItems, productToAdd) => {


// };

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {}
// });



// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const addItemToCart = (productToAdd) =>{
//       setCartItems(addCartItem(cartItems, productToAdd))
//   }
//   const value = { isCartOpen, setIsCartOpen };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems,cartItemToRemove) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
  cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
);

};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}
export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount:0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() =>{
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0)
    setCartCount(newCartCount);
  }, [cartItems])

   useEffect(() =>{
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

    const removeItemToCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

    const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount,  removeItemToCart, clearItemFromCart,cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};