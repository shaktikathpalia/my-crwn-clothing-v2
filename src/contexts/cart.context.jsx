import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
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
})

export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen ] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }


  return <CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart }}>{ children }</CartContext.Provider>
}