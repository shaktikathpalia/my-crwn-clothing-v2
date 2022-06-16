import { createContext, useState, useEffect } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
})

export const ProductsProvider = ({ children }) => {

  const [products, setProducts ] = useState([]);

  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);
  

  return <ProductsContext.Provider value={{ products, setProducts }}>{ children }</ProductsContext.Provider>
}