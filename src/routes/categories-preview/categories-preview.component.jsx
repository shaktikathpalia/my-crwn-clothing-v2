import { Link } from 'react-router-dom';
import { useContext } from 'react';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
  const { categoryMap } = useContext(CategoriesContext);

  return (
    <>
      {
        Object.keys(categoryMap).map(key => {
          const { title, items } = categoryMap[key];
          return (
            <div key={key}>
              <h2><Link to={key}>{title}</Link></h2>
              <div className='products-container'>
                {
                  items.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </>
  );
};

export default CategoriesPreview;
