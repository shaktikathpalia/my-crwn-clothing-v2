import { createContext, useReducer } from 'react';

export const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, { type, payload }) => {
  switch(type){
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartContext = createContext({
  ...INITIAL_STATE,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});


export const CartProvider = ({ children }) => {

  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
  const toggleIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN });
  }
  
  const updateCartItems = (cartItems) => {
    const cartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const cartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    const payload = {
      cartItems,
      cartCount,
      cartTotal
    }
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload });
  }

  const addItemToCart = productToAdd => updateCartItems(addCartItem(cartItems, productToAdd));
  const removeItemToCart = productToRemove => updateCartItems(removeCartItem(cartItems, productToRemove));
  const clearItemFromCart = cartItemToClear => updateCartItems(clearCartItem(cartItems, cartItemToClear));


  const value = {
    isCartOpen,
    toggleIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
