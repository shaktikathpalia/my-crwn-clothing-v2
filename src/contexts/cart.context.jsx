import { createContext, useState, useEffect } from 'react';

const addCartItem = (originalCartItems, productToAdd) => {
  const cartItems = [...originalCartItems];
  const itemIdx = cartItems.findIndex(item => item.id === productToAdd.id);
  if(itemIdx > -1){
    cartItems[itemIdx].quantity += 1;
  }else{
    cartItems.push({ ...productToAdd, quantity: 1 });
  }
  return cartItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: 0,
})

export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen ] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }


  return <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }}>{ children }</CartContext.Provider>
}