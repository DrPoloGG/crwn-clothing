import { useContext } from 'react';

import { ProductContext } from '../../contexts/product/product.context';

const Shop = () => {
  const { products } = useContext(ProductContext);
  console.log(products);
  
  return (
    <div>
      {products.map(({ id, name }) => {
        return (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Shop;
