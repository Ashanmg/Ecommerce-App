import React, { useEffect, useState } from 'react';
import CN from 'classnames';

import ProductCard from '../../components/ProductCard/ProductCard';
import {
  hiddenProds,
  initialMProducts,
  initialFProducts,
} from '../../config/product';

import './HomeScreen.scss';
import _ from 'lodash';
import useMediaQuery from '../../config/customHooks/useMediaQuery';

export const HomeScreen = ({ className, ...restProps }) => {
  const HomeScreenClasses = CN(
    'home-screen container max-w-screen-xl px-1 lg:px-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 h-auto',
    className,
    {}
  );

  const [largeWide, setLargeWide] = useState(false);
  const [mediumWide, setMediumWide] = useState(false);
  const [smallWide, setSmallWide] = useState(false);

  const isLargeWide = useMediaQuery('(min-width: 1024px)');
  const isMediumWide = useMediaQuery('(min-width: 768px)');
  const isSmallWide = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    setLargeWide(isLargeWide);
    setMediumWide(isMediumWide);
    setSmallWide(isSmallWide);
  }, [isLargeWide, isMediumWide, smallWide]);

  const [products, setProducts] = useState(initialFProducts);
  const [randomLimit, setRandomLimit] = useState(5);

  let productCopy = [...products];
  let randomFirst, randomSecond, randomThird;

  useEffect(() => {
    if (isLargeWide && isMediumWide && isSmallWide) {
      setProducts(initialFProducts);
      setRandomLimit(6);
    } else if (!isLargeWide && isMediumWide && isSmallWide) {
      console.log(isLargeWide, isMediumWide, isSmallWide);
      setProducts(initialMProducts);
      setRandomLimit(4);
    } else if (!isLargeWide && !isMediumWide && !isSmallWide) {
      setProducts(initialMProducts);
      setRandomLimit(4);
    }
  }, [isLargeWide, isMediumWide, isSmallWide]);

  useEffect(() => {
    const pro = setInterval(() => {
      let first = Math.floor(Math.random() * randomLimit);
      let second = Math.floor(Math.random() * randomLimit + randomLimit);
      let third = Math.floor(Math.random() * randomLimit + randomLimit * 2);

      randomFirst = Math.floor(Math.random() * hiddenProds.length);
      let randomFElement = hiddenProds[randomFirst];
      hiddenProds.splice(randomFirst, 1);

      randomSecond = Math.floor(Math.random() * hiddenProds.length);
      let randomSElement = hiddenProds[randomSecond];
      hiddenProds.splice(randomSecond, 1);

      randomThird = Math.floor(Math.random() * hiddenProds.length);
      let randomTElement = hiddenProds[randomThird];
      hiddenProds.splice(randomThird, 1);

      hiddenProds.push(productCopy[first]);
      hiddenProds.push(productCopy[second]);
      hiddenProds.push(productCopy[third]);

      productCopy[first] = randomFElement;
      productCopy[second] = randomSElement;
      productCopy[third] = randomTElement;

      setProducts(productCopy);
    }, 3000);

    return () => {
      clearInterval(pro);
    };
  }, [products]);

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
