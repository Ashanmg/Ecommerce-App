import React, { useEffect, useState } from 'react';
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
import product16 from '../../assets/products/16.png';
import product17 from '../../assets/products/17.png';
import product18 from '../../assets/products/18.png';
import product19 from '../../assets/products/19.png';
import product20 from '../../assets/products/20.png';
import product21 from '../../assets/products/21.png';
import product22 from '../../assets/products/22.png';
import product23 from '../../assets/products/23.png';
import product24 from '../../assets/products/24.png';
import product25 from '../../assets/products/25.png';
import product26 from '../../assets/products/26.png';
import product27 from '../../assets/products/27.png';

const prods = [
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
  {
    id: 16,
    thumbnail: product16,
  },
  {
    id: 17,
    thumbnail: product17,
  },
  {
    id: 18,
    thumbnail: product18,
  },
  {
    id: 19,
    thumbnail: product19,
  },
  {
    id: 20,
    thumbnail: product20,
  },
  {
    id: 21,
    thumbnail: product21,
  },
  {
    id: 22,
    thumbnail: product22,
  },
  {
    id: 23,
    thumbnail: product23,
  },
  {
    id: 24,
    thumbnail: product24,
  },
  {
    id: 25,
    thumbnail: product25,
  },
  {
    id: 26,
    thumbnail: product26,
  },
  {
    id: 27,
    thumbnail: product27,
  },
];

const initialProducts = [
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
import _ from 'lodash';

export const HomeScreen = ({ className, ...restProps }) => {
  const HomeScreenClasses = CN('home-screen flex flex-wrap', className, {});

  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setInterval(() => {
      let productCopy = [...products];
      let first = Math.floor(Math.random() * 5);
      let second = Math.floor(Math.random() * 5 + 5);
      let third = Math.floor(Math.random() * 5 + 10);

      let randomFirst = Math.floor(Math.random() * 5 + 15);
      let randomSecond = Math.floor(Math.random() * 5 + 20);
      let randomThird = Math.floor(Math.random() * 2 + 25);
      console.log(first, randomFirst);

      productCopy.splice(first, 1, prods[randomFirst]);
      productCopy[second] = prods[randomSecond];
      productCopy[third] = prods[randomThird];
      
      setProducts(productCopy);
    }, 3000);
  }, []);

  return (
    <div className={HomeScreenClasses} {...restProps}>
      {products.map((product, idx) => (
        <ProductCard
          onClick={() => console.log(idx)}
          key={product.id || _.uniqueId}
          thumbnail={product.thumbnail}
        />
      ))}
    </div>
  );
};

HomeScreen.defaultProps = {
  className: undefined,
};

export default HomeScreen;
