import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoryMap } = useContext(CategoriesContext);
  const [categoryData, setCategoryData] = useState(categoryMap[category]);
  
  useEffect(() => {
    setCategoryData(categoryMap[category]);
  }, [category, categoryMap]);

  return (
    <>
      <Link to="/shop">Back</Link>
      {
        categoryData && (
          <>
            <h2>{categoryData.title}</h2>
            <div className='products-container'>
              {
                categoryData.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </>
        )
      }
    </>
  )
}
export default Category;