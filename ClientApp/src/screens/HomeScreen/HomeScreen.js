import React from 'react';
import CN from 'classnames';

import ProductCard from '../../components/ProductCard/ProductCard';
import product1 from '../../assets/products/1.png';
import product2 from '../../assets/products/2.png';
import product3 from '../../assets/products/3.png';
import product4 from '../../assets/products/4.png';
import product5 from '../../assets/products/5.png';
import product6 from '../../assets/products/6.png';
import product7 from '../../assets/products/7.png';
import product8 from '../../assets/products/8.png';
import product9 from '../../assets/products/9.png';
import product10 from '../../assets/products/10.png';
import product11 from '../../assets/products/11.png';
import product12 from '../../assets/products/12.png';
import product13 from '../../assets/products/13.png';
import product14 from '../../assets/products/14.png';
import product15 from '../../assets/products/15.png';

const products = [
  {
    id: 1,
    thumbnail: product1,
  },
  {
    id: 2,
    thumbnail: product2,
  },
  {
    id: 3,
    thumbnail: product3,
  },
  {
    id: 4,
    thumbnail: product4,
  },
  {
    id: 5,
    thumbnail: product5,
  },
  {
    id: 6,
    thumbnail: product6,
  },
  {
    id: 7,
    thumbnail: product7,
  },
  {
    id: 8,
    thumbnail: product1,
  },
  {
    id: 1,
    thumbnail: product8,
  },
  {
    id: 9,
    thumbnail: product9,
  },
  {
    id: 10,
    thumbnail: product10,
  },
  {
    id: 11,
    thumbnail: product11,
  },
  {
    id: 12,
    thumbnail: product12,
  },
  {
    id: 13,
    thumbnail: product13,
  },
  {
    id: 14,
    thumbnail: product14,
  },
  {
    id: 15,
    thumbnail: product15,
  },
];

import './HomeScreen.scss';

export const HomeScreen = ({ className, ...restProps }) => {
  const HomeScreenClasses = CN('home-screen flex flex-wrap', className, {});

  return (
    <div className={HomeScreenClasses} {...restProps}>
      {products.map((product) => (
        <ProductCard key={product.id} thumbnail={product.thumbnail} />
      ))}
    </div>
  );
};

HomeScreen.defaultProps = {
  className: undefined,
};

export default HomeScreen;
